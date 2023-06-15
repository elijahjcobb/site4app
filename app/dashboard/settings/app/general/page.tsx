import { ReadOnlyEntity } from "@/components/client/read-only-entity";
import { Separator } from "@/components/ui/separator";
import { getAppFromServerSession, getUserIdFromServerSession } from "@/lib/api/verify-user";


export default async function AppSettingsGeneralPage(): Promise<JSX.Element> {

	const userId = await getUserIdFromServerSession();
	const app = await getAppFromServerSession(userId);

	return <div className="space-y-6">
		<div>
			<h3 className="text-lg font-medium">General</h3>
			<p className="text-sm text-muted-foreground">
				Change and view general settings for your app.
			</p>
		</div>
		<Separator />
		<ReadOnlyEntity value={app.name} title="Name" description="The name of your app." />
		<ReadOnlyEntity value={app.id} title="App ID" description="The identifier for your app." />
		<ReadOnlyEntity value={app.slug} title="Slug" description="The slug to access your app with." />
	</div>
}