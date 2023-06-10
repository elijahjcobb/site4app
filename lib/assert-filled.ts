import { APIError } from "./api-error"

export function assertArrayFilled<T>(value: string[]): string[] {
  if (!value) return []
  if (value.length === 0) return []
  return value.filter((val) => {
    if (val.length === 0) return false
    return true
  })
}

export function assertNonEmpty(
  value: string | undefined,
  name: string = "String"
): void {
  if (!value || value.trim().length === 0)
    throw new APIError({
      statusCode: 400,
      code: "invalid_body",
      message: `${name} cannot be an empty string.`,
    })
}
