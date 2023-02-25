import { supabase } from "#/db";
import { APIError } from "#/lib/api-error";
import { fetchBillingFromEvent } from "./fetch-billing";
import { StripeEvent } from ".";

export async function subscriptionCreated(event: StripeEvent): Promise<void> {
  const billing = await fetchBillingFromEvent(event);
  const { error } = await supabase
    .from("app")
    .update({
      isPro: true,
    })
    .eq("id", billing.app_id);

  if (error) throw new APIError(500, "Failed to set isPro on app.", error);
}
