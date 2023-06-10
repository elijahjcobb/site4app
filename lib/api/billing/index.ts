import Stripe from "stripe";

const STRIPE_API_KEY = process.env.STRIPE_API_KEY;
if (!STRIPE_API_KEY) throw new Error("STRIPE_API_KEY not found in env.");

export const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
});

export type StripeEvent = Stripe.Event.Data.Object;
