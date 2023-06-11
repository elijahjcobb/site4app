import { useCallback, useEffect, useMemo, useState } from "react"
import { getCookie } from "cookies-next"
import { APIError } from "lib/api-error"

import { useToast } from "@/components/ui/use-toast"

export interface FetcherConfig {
  path: string
  method: "POST" | "PUT" | "DELETE" | "GET"
  body?: object
  debug?: boolean
}

export async function fetcher<T extends object>({
  path,
  method,
  body,
  debug = false,
}: FetcherConfig): Promise<T> {
  const url = `/api${path}`
  if (debug) console.info(`Will make fetch to: '${url}'`)
  const bodyString = JSON.stringify(body)
  if (debug) console.info(`Adding body: '${bodyString}'`)
  const res = await fetch(url, {
    method,
    body: bodyString,
    credentials: "same-origin",
    headers: {
      authorization: `Bearer ${getCookie("authorization")}`,
    },
  })
  const resBody = await res.json()
  if (res.ok) {
    return resBody
  } else {
    const error = new APIError({
      statusCode: resBody.statusCode,
      message: resBody.message,
      code: resBody.code,
    })
    console.error(error)
    throw error
  }
}

export function useFetcher(config?: { initialLoading?: boolean }) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(config?.initialLoading ?? false)

  const f = useMemo(
    () =>
      async function fetching<T extends object>({
        ...config
      }: FetcherConfig): Promise<T> {
        setIsLoading(true)
        try {
          return await fetcher<T>({ ...config })
        } catch (e) {
          let title: string = "An error occurred"
          let description: string
          if (e instanceof APIError) {
            title = "An error occurred"
            description = e.message
          } else {
            title = "An unknown error occurred"
            description = "Please try again later."
          }
          toast({
            title,
            description,
            variant: "destructive",
          })
          throw e
        } finally {
          setIsLoading(false)
        }
      },
    [toast]
  )

  return [f, isLoading] as const
}

export function useFetch<T extends object>(
  config: FetcherConfig | (() => FetcherConfig)
): [T | undefined, boolean, APIError | undefined] {
  const [data, setData] = useState<T | undefined>(undefined)
  const [error, setError] = useState<APIError | undefined>(undefined)
  useEffect(() => {
    let realConfig: FetcherConfig

    if (typeof config === "function") {
      realConfig = config()
    } else realConfig = config

    fetcher<T>({ ...realConfig })
      .then((res) => {
        setData(res)
        setError(undefined)
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [data, data === undefined && error === undefined, error]
}
