
import { Copier } from "#/components/copier";
import { useApp } from "#/components/dashboard-page/dashboard-context";
import { Skeleton } from "#/components/skeleton";
import Link from "next/link";

export function SettingsAppPlan() {

	const app = useApp();

	return <section>
		<h3>Plan</h3>
		<p>Change your app&apos;s plan. See <Link target='_blank' href='/pricing'>pricing</Link>.</p>
		{app ? <Copier value={app.isPro ? "pro" : "hobby"} /> : <Skeleton height={36} />}
	</section>
}