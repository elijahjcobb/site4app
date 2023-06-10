import l from "lodash";

export function truncate(
  value: string,
  length: number,
  omission?: string
): string {
  return l.truncate(value, { length, omission });
}
