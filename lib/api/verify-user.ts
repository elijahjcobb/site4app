import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import { AppWithMeta, User, prisma } from "@/db"
import { getServerSession } from "next-auth"

import { APIError } from "@/lib/api-error"
import { authOptions } from "@/lib/auth"

function getBearerToken(req: NextRequest): string | undefined {
  const token = req.headers.get("authorization")
  if (!token) return undefined
  if (!token.startsWith("Bearer ")) return undefined
  const bearer = token.split(" ")[1]
  if (!bearer) return undefined
  if (bearer.length === 0) return undefined
  return bearer
}

async function getUserIdFromTokenId(id: string): Promise<string> {
  const token = await prisma.token.findUnique({
    where: {
      id,
    },
  })
  if (!token)
    throw new APIError({
      statusCode: 401,
      code: "authenticated_token_invalid",
      message: "The token you provided does not exist.",
    })
  await prisma.token.update({
    data: {
      last_used_at: new Date(),
    },
    where: {
      id,
    },
  })
  return token.owner_id
}

export async function getUserIdFromServerSession(): Promise<string> {
  const session = await getServerSession(authOptions)

  if (!session)
    throw new APIError({
      statusCode: 401,
      code: "user_not_authenticated",
      message: "No user is authenticated.",
    })

  // @ts-expect-error - ignore id undefined
  const id = session.user.id as unknown

  if (typeof id !== "string") {
    throw new APIError({
      statusCode: 401,
      code: "authenticated_user_not_valid",
      message: "The authentication token is invalid.",
    })
  }

  return id
}

export async function getUserFromServerSession(): Promise<User> {
  const id = await getUserIdFromServerSession()

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    throw new APIError({
      statusCode: 401,
      code: "authenticated_user_not_valid",
      message: "The authenticated user was not found.",
    })
  }

  return user
}

export async function getAppFromServerSession(
  user?: User | string
): Promise<AppWithMeta> {
  const appId = cookies().get("appId")?.value

  let userId: string

  if (typeof user === "string") userId = user
  else if (user) userId = user.id
  else userId = await getUserIdFromServerSession()

  let app: AppWithMeta

  if (!appId)
    app = await prisma.app.findFirstOrThrow({
      where: {
        owner_id: userId,
      },
      include: {
        meta: true,
      },
    })

  app = await prisma.app.findFirstOrThrow({
    where: {
      id: appId,
      owner_id: userId,
    },
    include: {
      meta: true,
    },
  })

  return app
}

export async function verifyUser(req: NextRequest): Promise<User> {
  const tokenId = getBearerToken(req)
  let id: string

  if (tokenId) {
    id = await getUserIdFromTokenId(tokenId)
  } else {
    id = await getUserIdFromServerSession()
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    throw new APIError({
      statusCode: 401,
      code: "authenticated_user_not_valid",
      message: "The authenticated user was not found.",
    })
  }

  return user
}
