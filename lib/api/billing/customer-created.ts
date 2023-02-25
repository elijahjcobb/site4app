import { StripeEvent } from ".";

export async function customerCreated(event: StripeEvent): Promise<void> {
  console.log({ customerCreated: event });
}
