import {
  prisma,
  type App,
  type AppWithMeta,
  type Billing,
  type Contact,
  type Meta,
  type Privacy,
  type Support,
  type Table,
  type Terms,
  type User,
} from "@/db"

import { APIError } from "../api-error"

function fetchItem<T extends Table>(table: string, id: string): Promise<T> {
  try {
    //@ts-expect-error - ignore the indexing
    return prisma[table].findFirstOrThrow({ where: { id } })
  } catch {
    throw new APIError({
      statusCode: 404,
      code: "not_found",
      message: `Can not find ${table} with id: '${id}'`,
    })
  }
}

export function fetchAppForOwner(id: string): Promise<App> {
  return fetchItem<App>("app", id)
}

export async function fetchAppMetaForOwner(
  id: string,
  user: User
): Promise<Meta> {
  return fetchItem<Meta>("meta", id)
}

export async function fetchContactForOwner(
  id: string,
  user: User
): Promise<Contact> {
  return fetchItem<Contact>("contact", id)
}

export async function fetchSupportForOwner(
  id: string,
  user: User
): Promise<Support> {
  return fetchItem<Support>("support", id)
}

export async function fetchTermsForOwner(
  id: string,
  user: User
): Promise<Terms> {
  return fetchItem<Terms>("terms", id)
}

export async function fetchPrivacyForOwner(
  id: string,
  user: User
): Promise<Privacy> {
  return fetchItem<Privacy>("privacy", id)
}

export async function fetchBillingForOwner(
  id: string,
  user: User
): Promise<Billing> {
  return fetchItem<Billing>("billing", id)
}

export async function fetchAppWithMetaForOwner(
  id: string,
  user: User
): Promise<AppWithMeta> {
  const res = await prisma.app.findFirst({
    where: { id },
    include: {
      meta: true,
    },
  })
  if (!res)
    throw new APIError({
      statusCode: 404,
      code: "not_found",
      message: `Cannot find app and metadata with id: '${id}'`,
    })
  return res
}

export function fetchBillingForAppId(appId: string): Promise<Billing> {
  return prisma.billing.findFirstOrThrow({
    where: { app_id: appId },
  })
}

export function fetchBillingForCustomerId(
  customerId: string
): Promise<Billing> {
  return prisma.billing.findFirstOrThrow({
    where: { customer_id: customerId },
  })
}
