import { User } from "@/db"
import Redis from "ioredis"
import { Mutex } from "redis-semaphore"

const MUTEX_KEYS = ["create-app"] as const

type MutexKey = (typeof MUTEX_KEYS)[number]

const redis = new Redis(process.env.KV_URL!)
const MUTEX_PREFIX = "mutex"

export function generateMutex(identifier: MutexKey | string): Mutex {
  return new Mutex(redis, `${MUTEX_PREFIX}:${identifier}`)
}

export async function withMutex<T>(
  identifier: MutexKey,
  owner: User | string,
  handler: () => Promise<T>
): Promise<T> {
  const ownerId = typeof owner === "string" ? owner : owner.id
  const mutex = generateMutex(`${identifier}:${ownerId}`)
  try {
    await mutex.acquire()
    return await handler()
  } finally {
    await mutex.release()
  }
}
