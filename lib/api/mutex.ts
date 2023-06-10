import { Mutex } from "redis-semaphore";
import Redis from "ioredis";

const MUTEX_KEYS = ["create-app"] as const;

type MutexKey = (typeof MUTEX_KEYS)[number];

const redis = new Redis(process.env.REDIS_CONNECTION_URL!);
const MUTEX_PREFIX = "mutex";

export function generateMutex(identifier: MutexKey | string): Mutex {
  return new Mutex(redis, `${MUTEX_PREFIX}:${identifier}`);
}

export async function withMutex<T>(
  identifier: MutexKey,
  owner: string,
  handler: () => Promise<T>
): Promise<T> {
  const mutex = generateMutex(`${identifier}:${owner}`);
  try {
    await mutex.acquire();
    return await handler();
  } finally {
    await mutex.release();
  }
}
