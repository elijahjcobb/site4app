import { Separator } from "@/components/ui/separator";

export default function AppSettingsBillingPage(): JSX.Element {
	return <div className="space-y-6">
		<div>
			<h3 className="text-lg font-medium">Billing</h3>
			<p className="text-sm text-muted-foreground">
				View and change your app subscription.
			</p>
		</div>
		<Separator />
	</div>
}