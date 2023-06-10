import { buffer } from "micro";
import { BillingError } from "./billing-error";
import { NextApiRequest } from "next";
import type Stripe from "stripe";
import { stripe } from ".";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;
if (!STRIPE_WEBHOOK_SECRET)
  throw new Error("STRIPE_WEBHOOK_SECRET not found in env.");

export async function verifyWebhook(
  req: NextApiRequest
): Promise<Stripe.Event> {
  const body = await buffer(req);
  const sig = req.headers["stripe-signature"];
  if (!sig) throw new BillingError("stripe-signature header not present");
  return stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
}
