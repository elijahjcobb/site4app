import { prisma } from "@/db";
import { getAppFromServerSession } from "@/lib/api/verify-user";

export default async function Page() {
	const app = await getAppFromServerSession();

	const meta = await prisma.meta.findFirst({
		where: {
			id: app.id
		}
	})

	return <div className="flex flex-col gap-4">
		<p>App</p>
		<code className="block">{JSON.stringify(app, null, 2)}</code>
		<p>Meta</p>
		<code className="block">{JSON.stringify(meta, null, 2)}</code>
	</div>
}