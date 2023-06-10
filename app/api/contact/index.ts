import { prisma } from "#/db";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { verifyBody } from "#/lib/api/verify-body";
import { T } from "@elijahjcobb/typr";

export default createEndpoint<{}>({
  POST: async ({ req, res }) => {
    const { name, email, type, message, id } = verifyBody(
      req,
      T.object({
        name: T.string(),
        email: T.string(),
        type: T.string(),
        message: T.string(),
        id: T.string(),
      })
    );

    const contact = await prisma.contact.create({
      data: {
        app_id: id,
        name: name.length === 0 ? null : name,
        email: email.length === 0 ? null : email,
        type,
        message,
      },
    });

    res.status(201).json({ id: contact.id });
  },
});
