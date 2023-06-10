import { App, User } from "@/db"
import _ from "lodash"

export function pick<T extends object, Keys extends keyof T>(
  object: T,
  ...keys: Keys[]
): { [K in Keys]: T[K] } {
  return _.pick(object, keys)
}

export function pickUser(user: User) {
  return pick(user, "id", "email", "name", "created_at", "updated_at")
}

export function pickApp(app: App) {
  return app
}
