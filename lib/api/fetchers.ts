import { supabase } from "#/db";
import { Database } from "#/db/types";
import { APIError } from "../api-error";

export type TableNames = keyof Database["public"]["Tables"];
export type App = Database["public"]["Tables"]["app"]["Row"];
export type AppMeta = Database["public"]["Tables"]["app_meta"]["Row"];
export type Contact = Database["public"]["Tables"]["contact"]["Row"];
export type Support = Database["public"]["Tables"]["support"]["Row"];
export type AppWithMeta = App & { meta?: AppMeta };

async function fetchItem<
  T extends TableNames,
  O extends Database["public"]["Tables"][T]["Row"]
>(id: string, table: TableNames): Promise<O> {
  const { data, error } = await supabase.from(table).select().eq("id", id);
  const row = data?.[0];
  if (error || !row) {
    throw new APIError(400, `Failed to fetch ${table}.`, error);
  }
  return row as O;
}

export async function fetchApp(id: string): Promise<App> {
  return fetchItem(id, "app");
}

export async function fetchAppMeta(id: string): Promise<AppMeta> {
  return fetchItem(id, "app_meta");
}

export async function fetchAppWithMeta(id: string): Promise<AppWithMeta> {
  const { data, error } = await supabase
    .from("app")
    .select(
      `
			*,
			meta: app_meta (
				*
			)
			`
    )
    .eq("id", id);
  const appWithMeta = data?.[0];
  if (error || !appWithMeta) {
    throw new APIError(404, `App not found.`, error);
  }
  return appWithMeta as AppWithMeta;
}

export async function fetchContact(id: string): Promise<Contact> {
  return fetchItem(id, "contact");
}

export async function fetchSupport(id: string): Promise<Support> {
  return fetchItem(id, "support");
}
