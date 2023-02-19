import { supabase } from "#/db";
import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { verifyUser } from "#/lib/api/token";
import { verifyBody } from "#/lib/api/verify-body";
import { assertNonEmpty } from "#/lib/assert-filled";
import {
  App,
  AppMeta,
  AppleAppResponse,
  appleAppToAppMeta,
} from "#/lib/types/app";
import { T } from "@elijahjcobb/typr";

export interface ApiResponseApp {
  app: App;
  meta: AppMeta;
}

export default createEndpoint<ApiResponseApp>({
  POST: async ({ req, res }) => {
    const { appId, appleId } = verifyBody(
      req,
      T.object({
        appleId: T.string(),
        appId: T.string(),
      })
    );

    assertNonEmpty(appId, "appId");
    assertNonEmpty(appleId, "appleId");

    const user = await verifyUser(req);

    const { data: appData, error: appError } = await supabase
      .from("app")
      .select()
      .eq("id", appId);

    const app = appData?.[0];
    if (appError || !app) {
      throw new APIError(400, "App does not exist.", appError);
    }

    if (app.owner_id !== user.id)
      throw new APIError(400, "App does not exist.");

    const appleRes = await fetch(
      `https://itunes.apple.com/lookup?id=${appleId}`,
      {
        method: "GET",
      }
    );

    if (!appleRes.ok)
      throw new APIError(500, "Failed to talk with apple server.");
    const appleResBody = (await appleRes.json()) as AppleAppResponse;

    const appleApp = appleResBody.results[0];
    if (!appleApp) throw new APIError(400, `No app exists for id: '${appId}'.`);

    const { data, error } = await supabase
      .from("app_meta")
      .upsert(appleAppToAppMeta(appleApp, app.id))
      .select();

    const appMeta = data?.[0];

    if (error || !appMeta) {
      throw new APIError(500, "Failed to upsert data.", error);
    }

    res.json({
      app,
      meta: appMeta,
    });
  },
});
