import { supabase } from "#/db";
import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { verifyUser } from "#/lib/api/token";
import { verifyBody } from "#/lib/api/verify-body";
import { assertNonEmpty } from "#/lib/assert-filled";
import { App } from "#/lib/types/app";
import { T } from "@elijahjcobb/typr";

export interface ApiResponseApp {
  app: App;
}

export default createEndpoint({
  POST: async ({ req, res }) => {
    const {
      name,
      slug,
      theme,
      enable_contact,
      enable_privacy,
      enable_support,
      enable_terms,
    } = verifyBody(
      req,
      T.object({
        name: T.string(),
        slug: T.string(),
        theme: T.optional(T.string()),
        enable_support: T.optional(T.boolean()),
        enable_privacy: T.optional(T.boolean()),
        enable_contact: T.optional(T.boolean()),
        enable_terms: T.optional(T.boolean()),
      })
    );

    assertNonEmpty(name, "name");
    assertNonEmpty(slug, "slug");

    if (!/^[a-zA-Z0-9-]+$/gm.test(slug)) {
      throw new APIError(
        400,
        "Slug must be any uppercase or lowercase letter, number or dash."
      );
    }

    let nullableTheme = theme ?? null;
    if (theme?.length === 0) nullableTheme = null;

    const user = await verifyUser(req);

    const { data, error } = await supabase
      .from("app")
      .insert({
        name,
        slug,
        theme: nullableTheme,
        enable_contact,
        enable_privacy,
        enable_support,
        enable_terms,
        owner_id: user.id,
      })
      .select();

    if (error) {
      if (error.code === "23505") {
        throw new APIError(400, "This slug is already taken.");
      }
      throw error;
    }
    const app = data[0];
    if (!app)
      throw new APIError(500, "App that was just created is undefined.");

    res.json({ app });
  },
});
