import { prisma } from "#/db";
import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { verifyPassword } from "#/lib/api/password";
import { tokenSign } from "#/lib/api/token";
import { verifyBody } from "#/lib/api/verify-body";
import { setCookie30Day } from "#/lib/cookie";
import { T } from "@elijahjcobb/typr";

export interface ApiResponseUserSignIn {
  token: string;
}

export default createEndpoint<ApiResponseUserSignIn>({
  POST: async ({ req, res }) => {
    const { email, password: rawPassword } = verifyBody(
      req,
      T.object({
        email: T.regex.email(),
        password: T.string(),
      })
    );

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new APIError(401, "Invalid credentials.");
    const passwordIsCorrect = await verifyPassword(rawPassword, user.password);
    if (!passwordIsCorrect) throw new APIError(401, "Invalid credentials.");

    const token = await tokenSign(user.id);
    setCookie30Day("authorization", token);
    res.json({ token });
  },
});
