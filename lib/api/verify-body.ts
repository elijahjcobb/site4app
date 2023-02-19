import { TType } from "@elijahjcobb/typr";
import { NextApiRequest } from "next";
import { APIError } from "lib/api-error";

export function verifyBody<T>(req: NextApiRequest, type: TType<T>): T {
  let b = req.body;
  try {
    if (typeof b === "string") b = JSON.parse(b);
  } catch {
    throw new APIError(
      400,
      "Invalid request body. Body must be a JSON string."
    );
  }
  const body = type.verify(b);
  if (!body)
    throw new APIError(
      400,
      "Invalid request body. Your JSON is not the right structure."
    );
  return body;
}
