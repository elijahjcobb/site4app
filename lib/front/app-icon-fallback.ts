import type { AppWithMeta } from "#/db";

export function getAppIconWithFallback(app?: AppWithMeta): string {
  return app?.meta?.icon_small ?? "/blank-app.jpeg";
}
