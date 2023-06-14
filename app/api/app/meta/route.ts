import { NextResponse } from "next/server"

import { createEndpoint } from "@/lib/api/create-endpoint"
import { fetchMeta } from "@/lib/api/fetchers"
import { verifyApp } from "@/lib/api/token"
import { verifyUser } from "@/lib/api/verify-user"
import { pickApp, pickMeta } from "@/lib/pick"

export const GET = createEndpoint(async (req) => {
  const user = await verifyUser()
  const app = await verifyApp(req, user)
  const meta = await fetchMeta(app.id)
  return NextResponse.json({ app: pickApp(app), meta: pickMeta(meta) })
})
