import va from "@vercel/analytics"

export type AnalyticsEvents = "foo"

export function track<E extends AnalyticsEvents>(event: E): void {
  va.track(event, {})
}
