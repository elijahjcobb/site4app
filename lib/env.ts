export type Env = "production" | "development" | "preview"

export const ENV: Env = (process.env.VERCEL_ENV as Env) ?? "development"

export function isPreview(): boolean {
  return ENV === "preview"
}

export function isProduction(): boolean {
  return ENV === "production"
}

export function isDevelopment(): boolean {
  return ENV === "development"
}
