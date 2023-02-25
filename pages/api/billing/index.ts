import { createEndpoint } from "#/lib/api/create-endpoint";
import { Billing, fetchBillingForAppId } from "#/lib/api/fetchers";
import { verifyApp, verifyUser } from "#/lib/api/token";

export interface ApiResponseBilling {
  billing: Billing;
}

export default createEndpoint({
  GET: async ({ req, res }) => {
    const user = await verifyUser(req);
    const app = await verifyApp(req, user.id);
    const billing = await fetchBillingForAppId(app.id);
    res.json({ billing });
  },
});
