import { NextResponse } from "next/server"
import { prisma } from "@/db"

import { APIError } from "@/lib/api-error"
import { createEndpoint } from "@/lib/api/create-endpoint"
import { verifyUser } from "@/lib/api/verify-user"

export const DELETE = createEndpoint<{ id: string }>(async (req, context) => {
  const user = await verifyUser(req)
  const id = context.params.id

  const res = await prisma.token.deleteMany({
    where: {
      owner_id: user.id,
      id,
    },
  })

  if (res.count === 0) {
    throw new APIError({
      statusCode: 404,
      message: "Token not found",
      code: "not_found",
    })
  }

  return NextResponse.json({ id })
})
