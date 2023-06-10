import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { AppWithMeta, fetchAppWithMeta } from "#/lib/api/fetchers";
import { verifyUser } from "#/lib/api/token";
import { verifyQuery } from "#/lib/api/verify-query";

export interface ApiResponseAppWithMeta {
  app: AppWithMeta;
}

export default createEndpoint<ApiResponseAppWithMeta>({
  GET: async ({ req, res }) => {
    const id = verifyQuery(req, "id");
    const user = await verifyUser(req);
    const app = await fetchAppWithMeta(id);
    if (app.owner_id !== user.id) throw new APIError(404, "App not found.");
    res.json({ app });
  },
});
