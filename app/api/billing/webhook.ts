import { checkoutSessionCompleted } from "#/lib/api/billing/checkout-session-completed";
import { customerCreated } from "#/lib/api/billing/customer-created";
import { subscriptionCreated } from "#/lib/api/billing/subscription-created";
import { subscriptionDeleted } from "#/lib/api/billing/subscription-deleted";
import { subscriptionUpdated } from "#/lib/api/billing/subscription-updated";
import { verifyWebhook } from "#/lib/api/billing/verify-webhook";
import { createEndpoint } from "#/lib/api/create-endpoint";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createEndpoint({
  POST: async ({ req: request, res: response }) => {
    const event = await verifyWebhook(request);
    const eventData = event.data.object;
    const eventType = event.type;

    try {
      switch (eventType) {
        case "checkout.session.completed":
          await checkoutSessionCompleted(eventData);
          break;
        case "customer.created":
          await customerCreated(eventData);
          break;
        case "customer.subscription.created":
          await subscriptionCreated(eventData);
          break;
        case "customer.subscription.deleted":
          await subscriptionDeleted(eventData);
          break;
        case "customer.subscription.updated":
          await subscriptionUpdated(eventData);
          break;
      }
    } catch (e) {
      console.error(e);
    }

    response.status(200).end();
  },
});
