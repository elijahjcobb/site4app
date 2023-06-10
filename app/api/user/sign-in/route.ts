import { NextResponse } from "next/server"
import { prisma } from "@/db"
import { T } from "@elijahjcobb/typr"

import { APIError } from "@/lib/api-error"
import { createEndpoint } from "@/lib/api/create-endpoint"
import { verifyPassword } from "@/lib/api/password"
import { tokenSign } from "@/lib/api/token"
import { verifyBody } from "@/lib/api/verify-body"
import { pickUser } from "@/lib/pick"

export const POST = createEndpoint(async (req) => {
  const { email, password: rawPassword } = await verifyBody(
    req,
    T.object({
      email: T.regex.email(),
      password: T.string(),
    })
  )

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user)
    throw new APIError({
      statusCode: 401,
      code: "invalid_email_or_password",
      message: "Invalid credentials.",
    })
  const passwordIsCorrect = await verifyPassword(rawPassword, user.password)
  if (!passwordIsCorrect)
    throw new APIError({
      statusCode: 401,
      code: "invalid_email_or_password",
      message: "Invalid credentials.",
    })

  const token = await tokenSign(user.id)
  const res = NextResponse.json(pickUser(user))
  res.cookies.set("authorization", token)
  return res
})
