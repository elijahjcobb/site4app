import { APIError } from "#/lib/api-error";
import type Stripe from "stripe";
import { BillingError } from "./billing-error";
import { T } from "@elijahjcobb/typr";
import { supabase } from "#/db";
import { da } from "date-fns/locale";

type Event = Stripe.Event.Data.Object;

export async function checkoutSessionCompleted(event: Event): Promise<void> {
  const { id, customer } = T.object({
    id: T.string(),
    customer: T.string(),
  }).force(event);

  const { data, error } = await supabase
    .from("billing")
    .select()
    .eq("session_id", id);

  const billing = data?.[0];
  if (!billing || error)
    throw new APIError(
      500,
      "Billing data not found for completed session.",
      error
    );

  const { error: updateError } = await supabase
    .from("billing")
    .update({
      customer_id: customer,
    })
    .eq("id", billing.id);

  if (updateError) throw new APIError(500, "Failed to update billing object.");
}
