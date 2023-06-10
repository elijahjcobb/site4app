import { T } from "@elijahjcobb/typr";
import { fetchBillingForCustomerId } from "../fetchers";
import type { StripeEvent } from ".";
import type { Billing } from "#/db";

export async function fetchBillingFromEvent(
  event: StripeEvent
): Promise<Billing> {
  const { customer } = T.object({
    customer: T.string(),
  }).force(event);
  return await fetchBillingForCustomerId(customer);
}
