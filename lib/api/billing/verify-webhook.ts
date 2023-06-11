import { NextRequest } from "next/server"
import { buffer } from "micro"
import type Stripe from "stripe"

import { stripe } from "."
import { BillingError } from "./billing-error"

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string
if (!STRIPE_WEBHOOK_SECRET)
  throw new Error("STRIPE_WEBHOOK_SECRET not found in env.")

export async function verifyWebhook(req: NextRequest): Promise<Stripe.Event> {
  throw new Error("Not implemented")
  // const body = await buffer(req)
  // const sig = req.headers.get("stripe-signature")
  // if (!sig) throw new BillingError("stripe-signature header not present")
  // return stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)
}
