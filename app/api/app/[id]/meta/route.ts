import { NextResponse } from "next/server"

import { createEndpoint } from "@/lib/api/create-endpoint"
import { fetchAppWithMetaForOwner } from "@/lib/api/fetchers"
import { verifyUser } from "@/lib/api/verify-user"
import { pickAppWithMeta } from "@/lib/pick"

export const GET = createEndpoint<{ id: string }>(async (req, context) => {
  const user = await verifyUser(req)
  const appWithMeta = await fetchAppWithMetaForOwner(context.params.id, user)
  const res = NextResponse.json(pickAppWithMeta(appWithMeta))
  res.cookies.set("appId", appWithMeta.id)
  return res
})
