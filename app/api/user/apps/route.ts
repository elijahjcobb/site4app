import { NextResponse } from "next/server"
import { prisma } from "@/db"

import { createEndpoint } from "@/lib/api/create-endpoint"
import { verifyUser } from "@/lib/api/verify-user"
import { pickApp } from "@/lib/pick"

export const GET = createEndpoint(async (req) => {
  const user = await verifyUser(req)
  const apps = await prisma.app.findMany({
    where: {
      owner_id: user.id,
    },
  })
  return NextResponse.json(apps.map((app) => pickApp(app)))
})
