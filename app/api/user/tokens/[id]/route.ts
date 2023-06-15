import { NextResponse } from "next/server"
import { prisma } from "@/db"

import { createEndpoint } from "@/lib/api/create-endpoint"
import { verifyUser } from "@/lib/api/verify-user"

export const DELETE = createEndpoint<{ id: string }>(async (req, context) => {
  const user = await verifyUser()
  const id = context.params.id

  await prisma.token.deleteMany({
    where: {
      owner_id: user.id,
      id,
    },
  })

  return NextResponse.json({ id })
})
