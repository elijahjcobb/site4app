import { supabase } from "#/db";
import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { AppWithMeta } from "#/lib/api/fetchers";
import { verifyUser } from "#/lib/api/token";

export interface ApiResponseAppAllWithMeta {
  apps: AppWithMeta[];
}

export default createEndpoint<ApiResponseAppAllWithMeta>({
  GET: async ({ req, res }) => {
    const user = await verifyUser(req);
    const { data: appData, error: appError } = await supabase
      .from("app")
      .select(
        `
			*,
			meta: app_meta (
				*
			)
			`
      )
      .eq("owner_id", user.id);
    if (appError || !appData) {
      throw new APIError(500, "Failed to fetch apps for user.", appError);
    }

    res.json({ apps: appData as AppWithMeta[] });
  },
});
