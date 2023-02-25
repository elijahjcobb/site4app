import { T } from "@elijahjcobb/typr";
import { StripeEvent } from ".";
import { fetchBillingFromEvent } from "./fetch-billing";
import { supabase } from "#/db";
import { APIError } from "#/lib/api-error";

export async function subscriptionUpdated(event: StripeEvent): Promise<void> {
  const { cancel_at, canceled_at } = T.object({
    cancel_at: T.union(T.number(), T.null()),
    canceled_at: T.union(T.number(), T.null()),
  }).force(event);
  const billing = await fetchBillingFromEvent(event);

  const { error: billingError } = await supabase
    .from("billing")
    .update({
      cancel_at,
      canceled_at,
      will_end: Boolean(cancel_at),
    })
    .eq("id", billing.id);
  if (billingError)
    throw new APIError(500, "Failed to update billing.", billingError);
}
