import { NextResponse } from "next/server"
import { Billing } from "@prisma/client"

import { APIError } from "@/lib/api-error"
import { stripe } from "@/lib/api/billing"
import { PORTAL_RETURN_URL } from "@/lib/api/billing/urls"
import { createEndpoint } from "@/lib/api/create-endpoint"
import { fetchBillingForAppId } from "@/lib/api/fetchers"
import { verifyApp } from "@/lib/api/token"
import { verifyUser } from "@/lib/api/verify-user"

export const GET = createEndpoint(async (req) => {
  const user = await verifyUser()
  const app = await verifyApp(req, user)

  let billing: Billing
  try {
    billing = await fetchBillingForAppId(app.id)
  } catch {
    return NextResponse.redirect("/api/billing/checkout", { status: 303 })
  }

  if (!billing.customer_id)
    throw new APIError({
      statusCode: 400,
      code: "not_found",
      message: "Cannot view customer portal for app without a customer.",
    })

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: billing.customer_id,
    return_url: PORTAL_RETURN_URL,
  })

  return NextResponse.redirect(portalSession.url, { status: 303 })
})
