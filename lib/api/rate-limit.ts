import { NextRequest } from "next/server"
import { User } from "@/db"

import { APIError } from "../api-error"
import { redis } from "./redis"

const RATE_LIMIT_KEY = "rate-limit"

type TimeUnit = "s" | "ms"
type ValidTime = `${number}${TimeUnit}`

function millisecondsFromTimeString(timeString: ValidTime): number {
  if (timeString.endsWith("ms")) {
    return parseInt(timeString.replace("ms", ""))
  } else {
    return parseInt(timeString.replace("s", "")) * 1000
  }
}

export const GLOBAL_RATE_LIMIT = "global"

export async function verifyRateLimit(
  req: NextRequest,
  identifier: User | string,
  throttleTime: ValidTime
): Promise<void> {
  const path = `${req.method}${req.nextUrl.pathname}`
  const userId = typeof identifier === "string" ? identifier : identifier.id
  const id = userId ?? req.ip ?? "*"
  const uniqueKey = `${RATE_LIMIT_KEY}:${path}:${id}`
  const hasRateLimit = Boolean(await redis.exists(uniqueKey))
  const throttleTimeMS = millisecondsFromTimeString(throttleTime)
  if (hasRateLimit) {
    throw new APIError({
      statusCode: 429,
      code: "rate_limit",
      message: `You have made too many requests. Please wait ${throttleTimeMS.toLocaleString()} milliseconds since last successful request.`,
    })
  }
  await redis.set(uniqueKey, "1", { px: throttleTimeMS })
}
