import { prisma } from "@/db";
import { createEndpoint } from "@/lib/api/create-endpoint";
import { fetchPrivacy } from "@/lib/api/fetchers";
import { verifyUser, verifyApp } from "@/lib/api/token";
import { verifyBody } from "@/lib/api/verify-body";
import { pickPrivacy } from "@/lib/pick";
import { T } from "@elijahjcobb/typr";
import { NextResponse } from "next/server";

export const GET = createEndpoint(async (req) => {
	const user = await verifyUser(req);
	const app = await verifyApp(req, user);
	const privacy = await fetchPrivacy(app.id);
	return NextResponse.json(pickPrivacy(privacy));
});

export const POST = createEndpoint(async (req) => {
	const { value } = await verifyBody(req, T.object({
		value: T.string()
	}));

	const user = await verifyUser(req);
	const app = await verifyApp(req, user);

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
	return NextResponse.json(pickPrivacy(privacy));

});