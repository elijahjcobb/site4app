import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"

import type { ClientUser } from "../pick"

export function useUser(): {
  status: "authenticated" | "unauthenticated" | "loading"
  user: ClientUser | null
} {
  const { data, status } = useSession()
  const [user, setUser] = useState<ClientUser | null>(null)
  const isLoading = useRef(false)

  useEffect(() => {
    if (!data?.user) return
    if (isLoading.current) return
    isLoading.current = true
    fetch("/api/user")
      .then((res) => res.json())
      .then((res) => {
        setUser(res)
      })
      .catch(console.error)
      .finally(() => {
        isLoading.current = false
      })
  }, [data])

  return { status, user }
}
