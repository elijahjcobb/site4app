import { Separator } from "@/components/ui/separator";

export default function AppSettingsAdvancedPage(): JSX.Element {
	return <div className="space-y-6">
		<div>
			<h3 className="text-lg font-medium">Advanced</h3>
			<p className="text-sm text-muted-foreground">
				Set up advanced settings for your app.
			</p>
		</div>
		<Separator />
	</div>
}