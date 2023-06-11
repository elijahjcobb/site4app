import { NextResponse } from "next/server"

import { createEndpoint } from "@/lib/api/create-endpoint"
import { fetchBillingForAppId } from "@/lib/api/fetchers"
import { verifyApp, verifyUser } from "@/lib/api/token"
import { pickBilling } from "@/lib/pick"

export const GET = createEndpoint(async (req) => {
  const user = await verifyUser(req)
  const app = await verifyApp(req, user)
  const billing = await fetchBillingForAppId(app.id)
  return NextResponse.json(pickBilling(billing))
})
