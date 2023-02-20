import {
  JsonWebTokenError,
  sign,
  TokenExpiredError,
  verify,
} from "jsonwebtoken";
import { NextApiRequest } from "next";
import { supabase } from "#/db";
import { APIError } from "lib/api-error";
import { Database } from "#/db/types";

export interface TokenData {
  id: string;
}

export interface Token extends TokenData {
  iat: number;
  exp: number;
}

export const TOKEN_NAME = "authorization";

export const TOKEN_AGE_SEC = 60 * 60 * 24 * 30;
const SECRET = process.env.TOKEN_SECRET as string;
if (!SECRET) throw new Error("TOKEN_SECRET is undefined.");

export function tokenSign(id: string): Promise<string> {
  const token: TokenData = { id };
  return new Promise((res, rej) => {
    sign(token, SECRET, { expiresIn: TOKEN_AGE_SEC }, (err, token) => {
      if (err || !token) rej(err);
      else res(token);
    });
  });
}

function tokenVerifyInternal(token: string): Promise<Token> {
  return new Promise((res, rej) => {
    verify(token, SECRET, (err, decoded) => {
      if (err || !decoded) rej(err);
      else res(decoded as Token);
    });
  });
}

async function tokenVerifyString(token: string): Promise<Token> {
  try {
    const verifiedToken = await tokenVerifyInternal(token);
    return verifiedToken;
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      throw new APIError(401, "Authentication expired.");
    } else if (e instanceof JsonWebTokenError) {
      throw new APIError(401, "Authentication invalid.");
    }
    throw e;
  }
}

export async function tokenVerifyRequestForType(
  req: NextApiRequest
): Promise<Token> {
  let token: string | undefined = req.cookies[TOKEN_NAME];

  if (!token) {
    const authHeader = req.headers.authorization ?? "";
    const arr = authHeader.split(" ");
    token = arr[1];
  }

  if (!token) {
    throw new APIError(
      401,
      `No bearer token present in cookies as '${TOKEN_NAME}'.`
    );
  }

  return tokenVerifyString(token);
}

export async function verifyUser(
  req: NextApiRequest,
  config?: {
    allowUnverified?: boolean;
  }
) {
  const { id } = await tokenVerifyRequestForType(req);
  const { data, error } = await supabase.from("user").select().eq("id", id);
  if (error || !data || data.length < 1) {
    console.error(error);
    throw new APIError(401, "Authentication user is invalid.");
  }
  const user = data[0];
  // if (config?.allowUnverified) return user;
  // if (!user.verified)
  // throw new APIError(401, "User has not verified their email address.");
  return user;
}

export async function verifyApp(req: NextApiRequest, userId: string) {
  const appId = req.query.appId || req.cookies.appId;
  if (typeof appId !== "string" || !appId)
    throw new APIError(
      400,
      "Cannot find app id. Either set the 'appId' cookie or '?appId=' url param."
    );
  const { data, error } = await supabase
    .from("app")
    .select()
    .eq("id", appId)
    .eq("owner_id", userId);
  const app = data?.[0];
  if (error || !app) {
    throw new APIError(400, "No app found for app id provided.", error);
  }
  return app;
}
