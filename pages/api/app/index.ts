import { supabase } from "#/db";
import { Database } from "#/db/types";
import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { isValidSlug } from "#/lib/api/is-valid-slug";
import { verifyApp, verifyUser } from "#/lib/api/token";
import { verifyBody } from "#/lib/api/verify-body";
import { verifyQuery } from "#/lib/api/verify-query";
import { assertNonEmpty } from "#/lib/assert-filled";
import { App } from "#/lib/types/app";
import { T } from "@elijahjcobb/typr";

export interface ApiResponseAppCreate {
  app: App;
}

export default createEndpoint({
  GET: async ({ req, res }) => {
    const user = await verifyUser(req);
    const app = await verifyApp(req, user.id);
    res.json({ app });
  },
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

    if (!isValidSlug(slug)) {
      throw new APIError(
        400,
        "Slug must be any uppercase or lowercase letter, number or dash."
      );
    }

    let nullableTheme = theme ?? null;
    if (theme?.length === 0) nullableTheme = null;
    if (nullableTheme) nullableTheme = nullableTheme.trim();

    const user = await verifyUser(req);

    const { data, error } = await supabase
      .from("app")
      .insert({
        name: name.trim(),
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
  PUT: async ({ req, res }) => {
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
    const app = await verifyApp(req, user.id);

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
      .eq("id", app.id)
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
