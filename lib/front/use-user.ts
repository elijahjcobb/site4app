import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

import type { ClientUser } from "../pick"

export function useUser(): {
  status: "authenticated" | "unauthenticated" | "loading"
  user: ClientUser | null
  signOut: () => void
} {
  const { data, status } = useSession()
  const router = useRouter()
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

  const handleSignOut = useCallback(() => {
    signOut()
    router.push("/user")
  }, [router])

  return { status, user, signOut: handleSignOut }
}
