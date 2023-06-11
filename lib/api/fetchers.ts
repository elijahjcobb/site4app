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

export async function fetchAppForOwner(id: string, user: User): Promise<App> {
  try {
    return await prisma.app.findFirstOrThrow({
      where: {
        id,
        owner_id: user.id,
      },
    })
  } catch {
    throw new APIError({
      statusCode: 404,
      code: "not_found",
      message: `Can not find app with id: '${id}'`,
    })
  }
}

export async function fetchContact(id: string): Promise<Contact> {
  return fetchItem<Contact>("contact", id)
}

export async function fetchSupport(id: string): Promise<Support> {
  return fetchItem<Support>("support", id)
}

export async function fetchTerms(id: string): Promise<Terms> {
  return fetchItem<Terms>("terms", id)
}

export async function fetchPrivacy(id: string): Promise<Privacy> {
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
  try {
    return await prisma.app.findFirstOrThrow({
      where: { id, owner_id: user.id },
      include: {
        meta: true,
      },
    })
  } catch {
    throw new APIError({
      statusCode: 404,
      code: "not_found",
      message: `Can not find app and metadata with id: '${id}'`,
    })
  }
}

export async function fetchMeta(appId: string): Promise<Meta> {
  return fetchItem<Meta>("meta", appId)
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
