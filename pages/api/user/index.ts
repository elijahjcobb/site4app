import { createEndpoint } from "#/lib/api/create-endpoint";
import { verifyUser } from "#/lib/api/token";
import { User } from "#/lib/types/user";

export interface ApiResponseUser {
  user: User;
}

export default createEndpoint<ApiResponseUser>({
  GET: async ({ req, res }) => {
    const user = await verifyUser(req);
    res.json({
      user: {
        id: user.id,
        email: user.email,
      },
    });
  },
});
