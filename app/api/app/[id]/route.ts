import { NextResponse } from "next/server"

import { createEndpoint } from "@/lib/api/create-endpoint"
import { fetchAppForOwner } from "@/lib/api/fetchers"
import { verifyUser } from "@/lib/api/token"
import { pickApp } from "@/lib/pick"

export const GET = createEndpoint<{ id: string }>(async (req, context) => {
  const user = await verifyUser(req)
  const app = await fetchAppForOwner(context.params.id, user)
  const res = NextResponse.json(pickApp(app))
  res.cookies.set("appId", app.id)
  return res
})
