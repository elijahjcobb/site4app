import { NextResponse } from "next/server"
import { prisma } from "@/db"

import { createEndpoint } from "@/lib/api/create-endpoint"
import { verifyUser } from "@/lib/api/verify-user"
import { pickAppWithMeta } from "@/lib/pick"

export const GET = createEndpoint(async (req) => {
  const user = await verifyUser()
  const apps = await prisma.app.findMany({
    where: {
      owner_id: user.id,
    },
    include: {
      meta: true,
    },
  })
  return NextResponse.json(apps.map((app) => pickAppWithMeta(app)))
})
