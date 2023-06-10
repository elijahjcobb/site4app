import { prisma } from "#/db";
import { APIError } from "#/lib/api-error";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { Privacy, Terms, fetchPrivacy, fetchTerms } from "#/lib/api/fetchers";
import { verifyApp, verifyUser } from "#/lib/api/token";
import { verifyBody } from "#/lib/api/verify-body";
import { T } from "@elijahjcobb/typr";

export interface ApiResponsePrivacy {
	value: Privacy;
}

export default createEndpoint<ApiResponsePrivacy>({
	GET: async ({ req, res }) => {
		const user = await verifyUser(req);
		const app = await verifyApp(req, user.id);
		const privacy = await fetchPrivacy(app.id);
		res.json({ value: privacy })
	},
	POST: async ({ req, res }) => {

		const { value } = verifyBody(req, T.object({
			value: T.string()
		}));

		const user = await verifyUser(req);
		const app = await verifyApp(req, user.id);

		const privacy = await prisma.privacy.upsert({
			where: {
				id: app.id
			},
			create: {
				id: app.id,
				value
			},
			update: {
				value
			}
		});

		await res.revalidate(`/${app.slug}/privacy`);
		res.json({ value: privacy })

	}
})