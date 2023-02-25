
import { Button } from "#/components/button";
import { useApp, useBilling } from "#/components/dashboard-page/dashboard-context";
import Link from "next/link";

export function SettingsAppPlan() {

	const app = useApp();
	const billing = useBilling();

	return <section>
		<h3>Plan</h3>
		<p>Change your app&apos;s plan. See <Link target='_blank' href='/pricing'>pricing</Link>.</p>
		<code>
			plan: {app?.isPro ? "PRO" : "hobby"}
		</code>
		<code>
			hasEnded: {billing?.has_ended ? "true" : "false"}
		</code>
		<code>
			willEnd: {billing?.will_end ? "true" : "false"}
		</code>
		<Button href="/api/billing/portal" value="Change Plan" />
	</section>
}