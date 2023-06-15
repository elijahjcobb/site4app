import { NextResponse } from "next/server"
import { prisma } from "@/db"
import { T } from "@elijahjcobb/typr"

import { createEndpoint } from "@/lib/api/create-endpoint"
import { verifyBody } from "@/lib/api/verify-body"
import { verifyUser } from "@/lib/api/verify-user"
import { pickToken } from "@/lib/pick"

export const POST = createEndpoint(async (req) => {
  const user = await verifyUser(req)
  const { name } = await verifyBody(req, T.object({ name: T.string() }))
  const token = await prisma.token.create({
    data: {
      name,
      owner_id: user.id,
    },
  })
  return NextResponse.json(pickToken(token))
})

export const DELETE = createEndpoint(async (req) => {
  const user = await verifyUser(req)

  const { count } = await prisma.token.deleteMany({
    where: {
      owner_id: user.id,
    },
  })

  return NextResponse.json({ count })
})

export const GET = createEndpoint(async (req) => {
  const user = await verifyUser(req)
  const tokens = await prisma.token.findMany({
    where: {
      owner_id: user.id,
    },
  })

  tokens.sort((a, b) => {
    if (!a.last_used_at) return -1
    if (!b.last_used_at) return -1
    return b.last_used_at.getTime() - a.last_used_at.getTime()
  })

  return NextResponse.json(tokens.map(pickToken))
})
