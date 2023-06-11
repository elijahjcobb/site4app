import { NextResponse } from "next/server"
import { prisma } from "@/db"
import { T } from "@elijahjcobb/typr"

import { APIError } from "@/lib/api-error"
import { createEndpoint } from "@/lib/api/create-endpoint"
import { verifyApp, verifyUser } from "@/lib/api/token"
import { verifyBody } from "@/lib/api/verify-body"
import { assertNonEmpty } from "@/lib/assert-filled"
import { pickApp, pickMeta } from "@/lib/pick"
import { AppleAppResponse, appleAppToAppMeta } from "@/lib/types/app"

export const POST = createEndpoint(async (req) => {
  const { appId, appleId } = await verifyBody(
    req,
    T.object({
      appleId: T.string(),
      appId: T.string(),
    })
  )

  assertNonEmpty(appId, "appId")
  assertNonEmpty(appleId, "appleId")

  const user = await verifyUser(req)

  const app = await prisma.app.findUniqueOrThrow({
    where: {
      id: appId,
    },
  })

  if (app.owner_id !== user.id)
    throw new APIError({
      statusCode: 404,
      code: "not_found",
      message: "No app exists for the provided id.",
    })

  const appleRes = await fetch(
    `https://itunes.apple.com/lookup?id=${appleId}`,
    {
      method: "GET",
    }
  )

  if (!appleRes.ok)
    throw new APIError({
      statusCode: 500,
      code: "external_error",
      message: "App metadata lookup had an external error.",
    })

  const appleResBody = (await appleRes.json()) as AppleAppResponse

  const appleApp = appleResBody.results[0]
  if (!appleApp)
    throw new APIError({
      statusCode: 404,
      code: "not_found",
      message: "No app exists for the appleId id provided.",
    })

  const metadata = appleAppToAppMeta(appleApp, app.id)

  const appMeta = await prisma.meta.upsert({
    update: metadata,
    create: metadata,
    where: { id: app.id },
  })

  return NextResponse.json({
    ...pickApp(app),
    meta: pickMeta(appMeta),
  })
})
