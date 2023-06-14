import { User, prisma } from "@/db"
import { getServerSession } from "next-auth"

import { APIError } from "@/lib/api-error"
import { authOptions } from "@/lib/auth"

export async function verifyUser(): Promise<User> {
  const session = await getServerSession(authOptions)

  if (!session)
    throw new APIError({
      statusCode: 401,
      code: "user_not_authenticated",
      message: "No user is authenticated.",
    })

  // @ts-expect-error - ignore id undefined
  const id = session.user.id as unknown

  if (typeof id !== "string") {
    throw new APIError({
      statusCode: 401,
      code: "authenticated_user_not_valid",
      message: "The authentication token is invalid.",
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    throw new APIError({
      statusCode: 401,
      code: "authenticated_user_not_valid",
      message: "The authenticated user was not found.",
    })
  }

  return user
}
