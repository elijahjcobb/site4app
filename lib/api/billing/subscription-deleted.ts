import { supabase } from "#/db";
import { APIError } from "#/lib/api-error";
import { StripeEvent } from ".";
import { fetchBillingFromEvent } from "./fetch-billing";

export async function subscriptionDeleted(event: StripeEvent): Promise<void> {
  const billing = await fetchBillingFromEvent(event);
  const { error: appError } = await supabase
    .from("app")
    .update({
      isPro: false,
    })
    .eq("id", billing.app_id);
  if (appError)
    throw new APIError(500, "Failed to set isPro on app.", appError);
  const { error: billingError } = await supabase
    .from("billing")
    .update({
      has_ended: true,
    })
    .eq("id", billing.id);
  if (billingError)
    throw new APIError(
      500,
      "Failed to set has_ended on billing.",
      billingError
    );
}
