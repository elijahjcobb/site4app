import { supabase } from "#/db";
import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { verifyUser } from "#/lib/api/token";
import { App } from "#/lib/types/app";

export interface ApiResponseAppAll {
  apps: App[];
}

export default createEndpoint<ApiResponseAppAll>({
  GET: async ({ req, res }) => {
    const user = await verifyUser(req);
    const { data, error } = await supabase
      .from("app")
      .select()
      .eq("owner_id", user.id);
    if (error || !data) {
      throw new APIError(500, "Failed to fetch apps for user.", error);
    }
    res.json({ apps: data });
  },
});
