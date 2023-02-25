import { APIError } from "#/lib/api-error";
import { stripe } from "#/lib/api/billing";
import { PORTAL_RETURN_URL } from "#/lib/api/billing/urls";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { type Billing, fetchBillingForAppId } from "#/lib/api/fetchers";
import { verifyApp, verifyUser } from "#/lib/api/token";

export default createEndpoint({
  GET: async ({ req, res }) => {
    const user = await verifyUser(req);
    const app = await verifyApp(req, user.id);

    let billing: Billing;
    try {
      billing = await fetchBillingForAppId(app.id);
    } catch {
      res.redirect(303, "/api/billing/checkout");
      return;
    }

    if (!billing.customer_id)
      throw new APIError(
        400,
        "Cannot view customer portal for app without a customer."
      );

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: billing.customer_id,
      return_url: PORTAL_RETURN_URL,
    });

    res.redirect(303, portalSession.url);
  },
});
