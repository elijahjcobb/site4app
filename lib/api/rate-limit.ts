import type { NextApiRequest } from "next"

import { APIError } from "../api-error"
import { redis } from "./redis"

const RATE_LIMIT_KEY = "rate-limit"

type TimeUnit = "s" | "ms"
type ValidTime = `${number}${TimeUnit}`

function secondsFromTimeString(timeString: ValidTime): number {
  if (timeString.endsWith("ms")) {
    return parseFloat(timeString.replace("ms", "")) / 1000
  }
  return parseFloat(timeString.replace("s", ""))
}

export async function verifyRateLimit({
  throttleTime,
  key,
  req,
  identifier,
}: {
  throttleTime: ValidTime
  key: string
  req: NextApiRequest
  identifier?: string
}): Promise<void> {
  const id = identifier ?? req.socket.remoteAddress ?? "*"
  const uniqueKey = `${RATE_LIMIT_KEY}:${key}:${id}`
  const hasRateLimit = Boolean(await redis.exists(uniqueKey))
  const throttleTimeS = secondsFromTimeString(throttleTime)
  if (!hasRateLimit) {
    throw new APIError({
      statusCode: 429,
      code: "rate_limit",
      message: `You have made too many requests. Please wait ${throttleTimeS} seconds.`,
    })
  }
  await redis.set(uniqueKey, "1", { ex: throttleTimeS })
}
