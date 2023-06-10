import { prisma } from "#/db";
import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { AppWithMeta } from "#/lib/api/fetchers";
import { verifyUser } from "#/lib/api/token";

export interface ApiResponseAppAllWithMeta {
  apps: AppWithMeta[];
}

export default createEndpoint<ApiResponseAppAllWithMeta>({
  GET: async ({ req, res }) => {
    const user = await verifyUser(req);
    const apps = await prisma.app.findMany({
      where: {
        owner_id: user.id,
      },
      include: {
        meta: true,
      },
    });

    res.json({ apps });
  },
});
