import { Separator } from "@/components/ui/separator"
import { AccountInfo } from "./info";

export default function SettingsProfilePage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Profile</h3>
				<p className="text-sm text-muted-foreground">
					Information about your account.
				</p>
			</div>
			<Separator />
			<AccountInfo />
		</div>
	)
}