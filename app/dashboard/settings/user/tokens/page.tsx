import { Separator } from "@/components/ui/separator"
import { TokensManager } from "./tokens"

export default function UserSettingsTokensPage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Tokens</h3>
				<p className="text-sm text-muted-foreground">
					Manage API tokens for your account.
				</p>
			</div>
			<Separator />
			<TokensManager />
		</div>
	)
}