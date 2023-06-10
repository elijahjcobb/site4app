import { prisma } from "#/db";
import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { verifyUser } from "#/lib/api/token";
import { App } from "#/lib/types/app";

export interface ApiResponseAppAll {
  apps: App[];
}

export default createEndpoint<ApiResponseAppAll>({
  GET: async ({ req, res }) => {
    const user = await verifyUser(req);
    const apps = await prisma.app.findMany({
      where: {
        owner_id: user.id,
      },
    });
    res.json({ apps });
  },
});
