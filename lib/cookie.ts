import { setCookie } from "cookies-next";
import { getDate30DaysInFuture } from "./date";

export type CookieKey = "authorization";

export function setCookie30Day(key: CookieKey, value: string): void {
  setCookie(key, value, { expires: getDate30DaysInFuture() });
}
