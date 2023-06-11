import { NextResponse } from "next/server"
import { prisma } from "@/db"
import { T } from "@elijahjcobb/typr"

import { createEndpoint } from "@/lib/api/create-endpoint"
import { verifyBody } from "@/lib/api/verify-body"

export const POST = createEndpoint(async (req) => {
  const { name, email, type, message, id } = await verifyBody(
    req,
    T.object({
      name: T.string(),
      email: T.string(),
      type: T.string(),
      message: T.string(),
      id: T.string(),
    })
  )

  await prisma.contact.create({
    data: {
      app_id: id,
    },
  })

  return NextResponse.json({}, { status: 201 })
})
