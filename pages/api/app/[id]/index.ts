import { supabase } from "#/db";
import { Database } from "#/db/types";
import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { App, fetchApp } from "#/lib/api/fetchers";
import { isValidSlug } from "#/lib/api/is-valid-slug";
import { verifyUser } from "#/lib/api/token";
import { verifyBody } from "#/lib/api/verify-body";
import { verifyQuery } from "#/lib/api/verify-query";
import { assertNonEmpty } from "#/lib/assert-filled";
import { T } from "@elijahjcobb/typr";

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
  PUT: async ({ req, res }) => {
    const id = verifyQuery(req, "id");

    const body = verifyBody(
      req,
      T.object({
        name: T.optional(T.string()),
        slug: T.optional(T.string()),
        theme: T.optional(T.string()),
        enable_support: T.optional(T.boolean()),
        enable_privacy: T.optional(T.boolean()),
        enable_contact: T.optional(T.boolean()),
        enable_terms: T.optional(T.boolean()),
      })
    );

    if (Object.keys(body).length === 0)
      throw new APIError(400, "You have not requested to update anything.");

    const {
      name,
      slug,
      theme,
      enable_contact,
      enable_privacy,
      enable_support,
      enable_terms,
    } = body;

    const user = await verifyUser(req);

    const { data: appData, error: appError } = await supabase
      .from("app")
      .select()
      .eq("id", id);

    const app = appData?.[0];
    if (appError || !app) {
      throw new APIError(400, "App not found.");
    }

    if (user.id !== app.owner_id) {
      throw new APIError(400, "App not found.");
    }

    const updates: Partial<Database["public"]["Tables"]["app"]["Update"]> = {};

    if (name) {
      assertNonEmpty(name, "name");
      updates.name = name.trim();
    }

    if (slug) {
      assertNonEmpty(slug, "slug");
      if (!isValidSlug(slug))
        throw new APIError(
          400,
          "Invalid slug. Slug must be letters, numbers, or -."
        );
      updates.slug = slug;
    }

    if (theme !== undefined) {
      const trimmed = theme.trim();
      if (trimmed.length === 0) updates.theme = null;
      else updates.theme = trimmed;
    }

    if (enable_contact !== undefined) {
      updates.enable_contact = enable_contact;
    }

    if (enable_privacy !== undefined) {
      updates.enable_privacy = enable_privacy;
    }

    if (enable_support !== undefined) {
      updates.enable_support = enable_support;
    }

    if (enable_terms !== undefined) {
      updates.enable_terms = enable_terms;
    }

    if (Object.keys(updates).length === 0)
      throw new APIError(400, "You did not provide any updates.");

    const { data, error } = await supabase
      .from("app")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) {
      if (error.code === "23505") {
        throw new APIError(400, "This slug is already taken.");
      }
      throw error;
    }
    const updatedApp = data[0];
    if (!updatedApp) throw new APIError(500, "Failed to update app.");

    res.json({ app: updatedApp });
  },
});
