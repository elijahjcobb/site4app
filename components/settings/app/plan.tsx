
import { PlanBadge } from "#/components/badge";
import { Button } from "#/components/button";
import { useApp } from "#/components/dashboard-page/dashboard-context";
import Link from "next/link";
import styles from "../index.module.css";

export function SettingsAppPlan() {

	const app = useApp();

	return <section>
		<div className={styles.flex}>
			<h3>Plan</h3>
			<PlanBadge type={app?.isPro ? "pro" : "hobby"} />
		</div>
		<p>Change your app&apos;s plan. See <Link target='_blank' href='/pricing'>pricing</Link>.</p>
		<Button href="/api/billing/portal" value="Change Plan" />
	</section>
}