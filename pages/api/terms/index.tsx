import { prisma } from "#/db";
import { createEndpoint } from "#/lib/api/create-endpoint";
import { Terms, fetchTerms } from "#/lib/api/fetchers";
import { verifyApp, verifyUser } from "#/lib/api/token";
import { verifyBody } from "#/lib/api/verify-body";
import { T } from "@elijahjcobb/typr";

export interface ApiResponseTerms {
	value: Terms;
}

export default createEndpoint<ApiResponseTerms>({
	GET: async ({ req, res }) => {
		const user = await verifyUser(req);
		const app = await verifyApp(req, user.id);
		const terms = await fetchTerms(app.id);
		res.json({ value: terms })
	},
	POST: async ({ req, res }) => {

		const { value } = verifyBody(req, T.object({
			value: T.string()
		}));

		const user = await verifyUser(req);
		const app = await verifyApp(req, user.id);

		const terms = await prisma.terms.upsert({
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

		await res.revalidate(`/${app.slug}/terms`);
		res.json({ value: terms })

	}
})