import { NextResponse } from "next/server"
import { prisma } from "@/db"
import { T } from "@elijahjcobb/typr"

import { createEndpoint } from "@/lib/api/create-endpoint"
import { verifyBody } from "@/lib/api/verify-body"
import { verifyUser } from "@/lib/api/verify-user"
import { pickToken } from "@/lib/pick"

export const POST = createEndpoint(async (req) => {
  const user = await verifyUser()
  const { name } = await verifyBody(req, T.object({ name: T.string() }))
  const token = await prisma.token.create({
    data: {
      name,
      owner_id: user.id,
    },
  })
  return NextResponse.json(pickToken(token))
})

export const GET = createEndpoint(async (req) => {
  const user = await verifyUser()
  const tokens = await prisma.token.findMany({
    where: {
      owner_id: user.id,
    },
  })
  return NextResponse.json(tokens.map(pickToken))
})
