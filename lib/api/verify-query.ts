import { NextRequest } from "next/server"
import { TType } from "@elijahjcobb/typr"
import { APIError } from "lib/api-error"

export function verifyQuery<T>(req: NextRequest, type: TType<T>): T {
  try {
    return type.force(Object.fromEntries(req.nextUrl.searchParams.entries()))
  } catch {
    throw new APIError({
      code: "invalid_search_parameters",
      statusCode: 400,
      message: `The search parameters provided are invalid.`,
    })
  }
}
