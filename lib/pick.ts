import { App, AppWithMeta, Billing, Meta, Privacy, Terms, User } from "@/db"
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

export function pickAppWithMeta(appWithMeta: AppWithMeta) {
  return {
    ...pickApp(appWithMeta),
    meta: appWithMeta.meta ? pickMeta(appWithMeta.meta) : null,
  }
}
