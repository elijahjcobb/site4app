import { NextRequest, NextResponse } from "next/server"
import { APIError } from "lib/api-error"

export function createEndpoint<T extends Record<string, unknown>>(
  handler: (req: NextRequest, context: { params: T }) => Promise<NextResponse>
) {
  return async function (
    req: NextRequest,
    context: { params: T }
  ): Promise<NextResponse> {
    try {
      return await handler(req, context)
    } catch (e) {
      if (e instanceof APIError) {
        return e.toResponse()
      } else {
        if (e instanceof Error) {
        } else {
          console.error(e)
        }
        return new APIError({
          statusCode: 500,
          code: "internal_server_error",
          message: "Internal server error.",
        }).toResponse()
      }
    }
  }
}
