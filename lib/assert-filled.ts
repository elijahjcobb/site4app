import { APIError } from "./api-error";

export function assertArrayFilled<T>(value: string[]): string[] {
  if (!value) return [];
  if (value.length === 0) return [];
  return value.filter((val) => {
    if (val.length === 0) return false;
    return true;
  });
}

export function assertNonEmpty(value: string, name: string = "String"): void {
  if (value.length === 0)
    throw new APIError(400, `${name} cannot be an empty string.`);
}
