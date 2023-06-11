import { Billing } from "@/db"
import { T } from "@elijahjcobb/typr"

import type { StripeEvent } from "."
import { fetchBillingForCustomerId } from "../fetchers"

export async function fetchBillingFromEvent(
  event: StripeEvent
): Promise<Billing> {
  const { customer } = T.object({
    customer: T.string(),
  }).force(event)
  return await fetchBillingForCustomerId(customer)
}
