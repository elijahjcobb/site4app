import { Separator } from "@/components/ui/separator"
import { ReadOnlyEntity } from "@/components/client/read-only-entity";
import { getUserFromServerSession } from "@/lib/api/verify-user";

export default async function SettingsProfilePage() {

	const user = await getUserFromServerSession();

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Profile</h3>
				<p className="text-sm text-muted-foreground">
					Information about your account.
				</p>
			</div>
			<Separator />
			<ReadOnlyEntity title='Name' description="The name that will be displayed on your profile and in emails." value={user.name} />
			<ReadOnlyEntity title='Email' description="The email associated with your account." value={user.email} />
			<ReadOnlyEntity title='User ID' description="The identifier for your account." mono value={user.id} />
		</div>
	)
}