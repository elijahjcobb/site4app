import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { AppWithMeta, fetchAppWithMeta } from "#/lib/api/fetchers";
import { verifyUser } from "#/lib/api/token";

export interface ApiResponseAppWithMeta {
  app: AppWithMeta;
}

export default createEndpoint<ApiResponseAppWithMeta>({
  GET: async ({ req, res }) => {
    const appId = req.cookies.appId;
    if (typeof appId !== "string")
      throw new APIError(400, "No 'appId' in cookies.");
    const user = await verifyUser(req);
    const app = await fetchAppWithMeta(appId);
    if (app.owner_id !== user.id) throw new APIError(404, "App not found.");
    res.json({ app });
  },
});
