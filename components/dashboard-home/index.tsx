import { useMemo } from "react";
import { useApp, useUser } from "../dashboard-page/dashboard-context";
import styles from "./index.module.css";
import { Copier } from "../copier";

export function DashboardHome() {

	const app = useApp();
	const user = useUser();

	const welcomeMessage = useMemo(() => `👋 Hi ${user?.name?.split(" ")[0]}!`, [user?.name]);

	return <div className={styles.container}>
		<h1>{welcomeMessage}</h1>
		<section>
			<h2>hi</h2>
			<p>Your website is live at:</p>
			<Copier value={`https://site4.app/${app?.slug}`} />
		</section>
	</div>
}