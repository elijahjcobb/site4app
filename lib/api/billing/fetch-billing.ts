import { T } from "@elijahjcobb/typr";
import { Billing, fetchBillingForCustomerId } from "../fetchers";
import type { StripeEvent } from ".";

export async function fetchBillingFromEvent(
  event: StripeEvent
): Promise<Billing> {
  const { customer } = T.object({
    customer: T.string(),
  }).force(event);
  return await fetchBillingForCustomerId(customer);
}
