import { T } from "@elijahjcobb/typr";
import { StripeEvent } from ".";
import { fetchBillingFromEvent } from "./fetch-billing";
import { prisma } from "#/db";

export async function subscriptionUpdated(event: StripeEvent): Promise<void> {
  const { cancel_at, canceled_at } = T.object({
    cancel_at: T.union(T.number(), T.null()),
    canceled_at: T.union(T.number(), T.null()),
  }).force(event);
  const billing = await fetchBillingFromEvent(event);

  await prisma.billing.update({
    where: { id: billing.id },
    data: {
      cancel_at,
      canceled_at,
      will_end: Boolean(cancel_at),
    },
  });
}
