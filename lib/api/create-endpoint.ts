import { NextApiRequest, NextApiResponse } from "next";
import { APIError } from "lib/api-error";
import { NextRequest, NextResponse } from "next/server";

export type MethodType = "GET" | "PUT" | "POST" | "DELETE";

type Handler<T> = (refs: {
  req: NextApiRequest;
  res: NextApiResponse<T>;
}) => Promise<void>;

const DEFAULT_MESSAGE = "Internal server error.";

export function createEndpoint<T extends object>(
  handlers: Partial<Record<MethodType, Handler<T>>>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      let handler: Handler<T> | undefined = handlers[req.method as MethodType];
      if (!handler) throw new APIError(404, "Endpoint not found.");
      await handler({ req, res });
    } catch (e) {
      if (e instanceof APIError) {
        console.error(`API ERROR ${e.code}: '${e.message}'`);
        if (e.error) console.error(e.error);
        return res
          .status(e.code)
          .json({ error: e.code < 500 ? e.message : DEFAULT_MESSAGE });
      }
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error(e);
      }
      res.status(500).json({ error: DEFAULT_MESSAGE });
    }
  };
}

export function createEndpointAppDir(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(req);
    } catch (e) {
      if (e instanceof APIError) {
        console.error(`API ERROR ${e.code}: '${e.message}'`);
        if (e.error) console.error(e.error);
        return NextResponse.json(
          { error: e.code < 500 ? e.message : DEFAULT_MESSAGE },
          { status: e.code }
        );
      }
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error(e);
      }
      return NextResponse.json({ error: DEFAULT_MESSAGE }, { status: 500 });
    }
  };
}
