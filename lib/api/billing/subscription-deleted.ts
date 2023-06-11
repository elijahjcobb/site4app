import { prisma } from "@/db"

import { StripeEvent } from "."
import { fetchBillingFromEvent } from "./fetch-billing"

export async function subscriptionDeleted(event: StripeEvent): Promise<void> {
  const billing = await fetchBillingFromEvent(event)

  await prisma.app.update({
    where: { id: billing.app_id },
    data: { is_pro: false },
  })

  await prisma.billing.update({
    data: {
      has_ended: true,
    },
    where: {
      id: billing.id,
    },
  })
}
