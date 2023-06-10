import { NextRequest } from "next/server"
import { App, prisma, type User } from "@/db"
import {
  JsonWebTokenError,
  TokenExpiredError,
  sign,
  verify,
} from "jsonwebtoken"
import { APIError } from "lib/api-error"

export interface TokenData {
  id: string
}

export interface Token extends TokenData {
  iat: number
  exp: number
}

export const TOKEN_NAME = "authorization"

export const TOKEN_AGE_SEC = 60 * 60 * 24 * 30
const SECRET = process.env.TOKEN_SECRET as string
if (!SECRET) throw new Error("TOKEN_SECRET is undefined.")

export function tokenSign(id: string): Promise<string> {
  const token: TokenData = { id }
  return new Promise((res, rej) => {
    sign(token, SECRET, { expiresIn: TOKEN_AGE_SEC }, (err, token) => {
      if (err || !token) rej(err)
      else res(token)
    })
  })
}

function tokenVerifyInternal(token: string): Promise<Token> {
  return new Promise((res, rej) => {
    verify(token, SECRET, (err, decoded) => {
      if (err || !decoded) rej(err)
      else res(decoded as Token)
    })
  })
}

async function tokenVerifyString(token: string): Promise<Token> {
  try {
    const verifiedToken = await tokenVerifyInternal(token)
    return verifiedToken
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      throw new APIError({
        statusCode: 401,
        code: "authenticated_token_expired",
        message: "Authentication expired.",
      })
    } else if (e instanceof JsonWebTokenError) {
      throw new APIError({
        statusCode: 401,
        code: "authenticated_token_invalid",
        message: "Authentication token invalid.",
      })
    }
    throw e
  }
}

export async function tokenVerifyRequestForType(
  req: NextRequest
): Promise<Token> {
  let token: string | undefined = req.cookies.get(TOKEN_NAME)?.value

  if (!token) {
    const authHeader = req.headers.get("authorization") ?? ""
    const arr = authHeader.split(" ")
    token = arr[1]
  }

  if (!token) {
    throw new APIError({
      statusCode: 401,
      code: "no_token",
      message: `No bearer token present in cookies as '${TOKEN_NAME}' or in the 'Authorization' header.`,
    })
  }

  return tokenVerifyString(token)
}

export async function verifyUser(
  req: NextRequest,
  config?: {
    allowUnverified?: boolean
  }
): Promise<User> {
  const { id } = await tokenVerifyRequestForType(req)
  const user = await prisma.user.findUnique({
    where: { id },
  })
  if (!user) {
    throw new APIError({
      statusCode: 401,
      code: "authenticated_user_not_valid",
      message: "Authenticated user is invalid.",
    })
  }
  return user
}

export async function verifyApp(
  req: NextRequest,
  userId: string
): Promise<App> {
  const appId =
    req.nextUrl.searchParams.get("appId") || req.cookies.get("appId")?.value
  if (typeof appId !== "string" || !appId)
    throw new APIError({
      statusCode: 401,
      code: "app_not_authenticated",
      message:
        "Cannot find app id. Either set the 'appId' cookie or '?appId=' url param.",
    })

  const app = await prisma.app.findFirst({
    where: {
      id: appId,
      owner_id: userId,
    },
  })

  if (!app) {
    throw new APIError({
      statusCode: 401,
      code: "authenticated_app_not_valid",
      message: "No app exists for the authenticated appId.",
    })
  }
  return app
}
