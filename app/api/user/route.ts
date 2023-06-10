import { NextResponse } from "next/server"

import { createEndpoint } from "@/lib/api/create-endpoint"
import { verifyUser } from "@/lib/api/token"
import { pickUser } from "@/lib/pick"

export const GET = createEndpoint(async (req) => {
  const user = await verifyUser(req)
  return NextResponse.json(pickUser(user))
})
