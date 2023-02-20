import { supabase } from "#/db";
import { Database } from "#/db/types";
import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { App, fetchApp } from "#/lib/api/fetchers";
import { verifyUser } from "#/lib/api/token";
import { verifyQuery } from "#/lib/api/verify-query";

export interface ApiResponseApp {
  app: App;
}

export default createEndpoint<ApiResponseApp>({
  GET: async ({ req, res }) => {
    const user = await verifyUser(req);
    const id = verifyQuery(req, "id");
    const app = await fetchApp(id);
    if (app.owner_id !== user.id) throw new APIError(404, "App not found.");
    res.json({ app });
  },
});
