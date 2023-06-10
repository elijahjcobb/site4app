import type Stripe from "stripe";
import { T } from "@elijahjcobb/typr";
import { prisma } from "#/db";

type Event = Stripe.Event.Data.Object;

export async function checkoutSessionCompleted(event: Event): Promise<void> {
  const { id, customer } = T.object({
    id: T.string(),
    customer: T.string(),
  }).force(event);

  const billing = await prisma.billing.findUnique({
    where: {
      id,
    },
  });

  await prisma.billing.update({
    where: {
      id: billing?.id,
    },
    data: {
      customer_id: customer,
    },
  });
}
