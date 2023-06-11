import { prisma } from "@/db"

import { StripeEvent } from "."
import { fetchBillingFromEvent } from "./fetch-billing"

export async function subscriptionCreated(event: StripeEvent): Promise<void> {
  const billing = await fetchBillingFromEvent(event)

  await prisma.app.update({
    data: {
      is_pro: true,
    },
    where: {
      id: billing.app_id,
    },
  })
}
