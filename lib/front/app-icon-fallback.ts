import { AppWithMeta } from "../api/fetchers";

export function getAppIconWithFallback(app?: AppWithMeta): string {
  return app?.meta?.icon_small ?? "/blank-app.jpeg";
}
