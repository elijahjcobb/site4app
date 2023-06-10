import type { NextApiRequest } from "next";
import { redis } from "./redis";
import { APIError } from "../api-error";

const RATE_LIMIT_KEY = "rate-limit";

type TimeUnit = "s" | "ms";
type ValidTime = `${number}${TimeUnit}`;

function secondsFromTimeString(timeString: ValidTime): number {
  if (timeString.endsWith("ms")) {
    return parseFloat(timeString.replace("ms", "")) / 1000;
  }
  return parseFloat(timeString.replace("s", ""));
}

export async function verifyRateLimit(
  req: NextApiRequest,
  throttleTime: ValidTime,
  identifier?: string
): Promise<void> {
  const id = identifier ?? req.socket.remoteAddress;
  if (!id) return;
  const key = `${RATE_LIMIT_KEY}:${id}`;
  const hasRateLimit = Boolean(await redis.exists(key));
  const throttleTimeS = secondsFromTimeString(throttleTime);
  if (!hasRateLimit) {
    throw new APIError(
      429,
      `You have made too many requests. Please wait ${throttleTimeS} seconds.`
    );
  }
  await redis.set(key, "1", { ex: throttleTimeS });
}
