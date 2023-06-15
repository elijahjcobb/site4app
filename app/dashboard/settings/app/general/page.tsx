import { Separator } from "@/components/ui/separator";

export default function AppSettingsGeneralPage(): JSX.Element {
	return <div className="space-y-6">
		<div>
			<h3 className="text-lg font-medium">General</h3>
			<p className="text-sm text-muted-foreground">
				Change and view general settings for your app.
			</p>
		</div>
		<Separator />
	</div>
}