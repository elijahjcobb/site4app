import { prisma } from "#/db";
import type {
  App,
  AppWithMeta,
  Billing,
  Contact,
  Meta,
  Privacy,
  Support,
  Table,
  Terms,
} from "#/db";
import { APIError } from "../api-error";

function fetchItem<T extends Table>(table: string, id: string): Promise<T> {
  try {
    //@ts-expect-error - ignore the indexing
    return prisma[table].findFirstOrThrow({ where: { id } });
  } catch {
    throw new APIError(404, `Can not find ${table} with id: '${id}'`);
  }
}

export function fetchApp(id: string): Promise<App> {
  return fetchItem<App>("app", id);
}

export async function fetchAppMeta(id: string): Promise<Meta> {
  return fetchItem<Meta>("meta", id);
}

export async function fetchContact(id: string): Promise<Contact> {
  return fetchItem<Contact>("contact", id);
}

export async function fetchSupport(id: string): Promise<Support> {
  return fetchItem<Support>("support", id);
}

export async function fetchTerms(id: string): Promise<Terms> {
  return fetchItem<Terms>("terms", id);
}

export async function fetchPrivacy(id: string): Promise<Privacy> {
  return fetchItem<Privacy>("privacy", id);
}

export async function fetchBilling(id: string): Promise<Billing> {
  return fetchItem<Billing>("billing", id);
}

export async function fetchAppWithMeta(id: string): Promise<AppWithMeta> {
  const res = await prisma.app.findFirst({
    where: { id },
    include: {
      meta: true,
    },
  });
  if (!res)
    throw new APIError(404, `Cannot find app and metadata with id: '${id}'`);
  return res;
}

export function fetchBillingForAppId(appId: string): Promise<Billing> {
  return prisma.billing.findFirstOrThrow({
    where: { app_id: appId },
  });
}

export function fetchBillingForCustomerId(
  customerId: string
): Promise<Billing> {
  return prisma.billing.findFirstOrThrow({
    where: { customer_id: customerId },
  });
}
