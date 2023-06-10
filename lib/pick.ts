import _ from "lodash"

export function pick<T extends object, Keys extends keyof T>(
  object: T,
  ...keys: Keys[]
): { [K in Keys]: T[K] } {
  return _.pick(object, keys)
}
