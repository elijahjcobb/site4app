import { prisma } from "#/db";
import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { createPassword } from "#/lib/api/password";
import { tokenSign } from "#/lib/api/token";
import { verifyBody } from "#/lib/api/verify-body";
import { assertNonEmpty } from "#/lib/assert-filled";
import { setCookie30Day } from "#/lib/cookie";
import { T } from "@elijahjcobb/typr";

export interface ApiResponseUserSignUp {
  token: string;
}

export default createEndpoint<ApiResponseUserSignUp>({
  POST: async ({ req, res }) => {
    const {
      email,
      password: rawPassword,
      name,
    } = verifyBody(
      req,
      T.object({
        email: T.regex.email(),
        password: T.string(),
        name: T.string(),
      })
    );

    if (rawPassword.length < 8)
      throw new APIError(
        400,
        "Your password must be at least 8 characters long."
      );

    const password = await createPassword(rawPassword);

    assertNonEmpty(name, "name");

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name: name.trim(),
      },
    });

    const token = await tokenSign(user.id);
    setCookie30Day("authorization", token);

    res.json({ token });
  },
});
