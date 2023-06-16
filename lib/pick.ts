import {
  App,
  AppWithMeta,
  Billing,
  Meta,
  Privacy,
  Terms,
  Token,
  User,
} from "@/db"
import _ from "lodash"

export function pick<T extends object, Keys extends keyof T>(
  object: T,
  ...keys: Keys[]
): { [K in Keys]: T[K] } {
  return _.pick(object, keys)
}

export type ClientUser = Pick<
  User,
  | "id"
  | "email"
  | "name"
  | "image"
  | "emailVerified"
  | "created_at"
  | "updated_at"
>

export function pickUser(user: User): ClientUser {
  return pick(
    user,
    "id",
    "email",
    "name",
    "emailVerified",
    "image",
    "created_at",
    "updated_at"
  )
}

export function pickApp(app: App) {
  return app
}

export function pickPrivacy(privacy: Privacy) {
  return privacy
}

export function pickTerms(terms: Terms) {
  return terms
}

export function pickBilling(billing: Billing) {
  return billing
}

export function pickMeta(meta: Meta) {
  return meta
}

export type ClientToken = Pick<
  Token,
  "id" | "name" | "owner_id" | "last_used_at" | "created_at" | "updated_at"
>

export function pickToken(token: Token) {
  return token
}

export function pickAppWithMeta(appWithMeta: AppWithMeta) {
  return {
    ...pickApp(appWithMeta),
    meta: appWithMeta.meta ? pickMeta(appWithMeta.meta) : null,
  }
}
