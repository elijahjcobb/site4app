import { supabase } from "#/db";
import { Database } from "#/db/types";
import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { verifyUser } from "#/lib/api/token";
import { verifyBody } from "#/lib/api/verify-body";
import { assertNonEmpty } from "#/lib/assert-filled";
import { fetcher } from "#/lib/fetcher";
import { AppleAppResponse, appleAppToApp } from "#/lib/types/app";
import { T } from "@elijahjcobb/typr";

export interface ApiResponseApp {
  app: Database["public"]["Tables"]["app"]["Row"];
}

export default createEndpoint<ApiResponseApp>({
  POST: async ({ req, res }) => {
    const { appId, slug } = verifyBody(
      req,
      T.object({
        appId: T.string(),
        slug: T.string(),
      })
    );

    assertNonEmpty(appId, "appId");
    assertNonEmpty(slug, "slug");

    const user = await verifyUser(req);

    const { results } = await fetcher<AppleAppResponse>({
      url: `https://itunes.apple.com/lookup?id=${appId}`,
      method: "GET",
    });

    const appleApp = results[0];
    if (!appleApp) throw new APIError(400, `No app exists for id: '${appId}'.`);

    const { data, error } = await supabase
      .from("app")
      .insert(appleAppToApp(appleApp, user.id, slug))
      .select();

    const app = data?.[0];

    console.log({ data, error });

    if (error || !app) {
      if (error?.code === "23505") {
        throw new APIError(400, `Slug ${slug} is already taken.`);
      }
      throw error;
    }

    res.json({
      app,
    });
  },
});
