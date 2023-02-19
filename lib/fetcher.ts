import { APIError } from "./api-error";

export async function fetcher<T extends object>({
  path,
  url,
  method,
  throwOnHTTPError = true,
  body,
}: {
  path?: string;
  url?: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  throwOnHTTPError?: boolean;
  body?: Record<string, unknown>;
}): Promise<T> {
  let appendedPath = path;
  if (appendedPath) appendedPath = `/api/${appendedPath}`;
  const reqUrl = appendedPath ?? url;
  if (!reqUrl) throw new Error("Did not provide path or url.");
  const bodyPayload = body ? { body: JSON.stringify(body) } : {};
  const res = await fetch(reqUrl, {
    method,
    ...bodyPayload,
  });
  const resBody = (await res.json()) as T;
  if (throwOnHTTPError && !res.ok)
    // @ts-expect-error
    throw new APIError(res.status, resBody.error);
  return resBody;
}
