import { supabase } from "#/db";
import { APIError } from "#/lib/api-error";
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

		const { data, error } = await supabase
			.from("terms")
			.upsert({
				id: app.id,
				value
			})
			.select();

		const terms = data?.[0];
		if (error || !terms) {
			throw new APIError(500, "Failed to save terms.", error);
		}

		await res.revalidate(`/${app.slug}/terms`);
		res.json({ value: terms })

	}
})