import { NextResponse } from "next/server"
import { prisma } from "@/db"
import { T } from "@elijahjcobb/typr"

import { APIError } from "@/lib/api-error"
import { createEndpoint } from "@/lib/api/create-endpoint"
import { isValidSlug } from "@/lib/api/is-valid-slug"
import { verifyRateLimit } from "@/lib/api/rate-limit"
import { verifyApp } from "@/lib/api/token"
import { verifyBody } from "@/lib/api/verify-body"
import { verifyUser } from "@/lib/api/verify-user"
import { assertNonEmpty } from "@/lib/assert-filled"
import { pickApp } from "@/lib/pick"

export const GET = createEndpoint(async (req) => {
  const user = await verifyUser(req)
  const app = await verifyApp(req, user)
  return NextResponse.json(pickApp(app))
})

export const POST = createEndpoint(async (req) => {
  const user = await verifyUser(req)

  await verifyRateLimit(req, user, "10s")

  const userFreeAppCount = await prisma.app.count({
    where: {
      owner_id: user.id,
      is_pro: false,
    },
  })

  if (userFreeAppCount >= 1) {
    throw new APIError({
      statusCode: 400,
      code: "resource_limit_reached",
      message:
        "You can only have one free app. Please upgrade an app and try again.",
    })
  }

  const {
    name,
    slug,
    theme,
    enable_contact,
    enable_privacy,
    enable_support,
    enable_terms,
  } = await verifyBody(
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
  )

  assertNonEmpty(name, "name")
  assertNonEmpty(slug, "slug")

  if (!isValidSlug(slug)) {
    throw new APIError({
      statusCode: 400,
      code: "invalid_regex",
      message:
        "Slug must be any uppercase or lowercase letter, number or dash.",
    })
  }

  let nullableTheme = theme ?? null
  if (theme?.length === 0) nullableTheme = null
  if (nullableTheme) nullableTheme = nullableTheme.trim()

  const app = await prisma.app.create({
    data: {
      name: name.trim(),
      slug,
      theme: nullableTheme,
      enable_contact,
      enable_privacy,
      enable_support,
      enable_terms,
      owner_id: user.id,
    },
  })

  return NextResponse.json(app)
})
