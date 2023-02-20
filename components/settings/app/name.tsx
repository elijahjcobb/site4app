
import { Button } from "#/components/button";
import { useAppNoUpdate, useDashboardContext } from "#/components/dashboard-page/dashboard-context";
import { Field } from "#/components/field";
import { SkeletonContainer } from "#/components/skeleton";
import { fetcher } from "#/lib/fetcher";
import { useState, useEffect, useCallback } from "react";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import styles from "../index.module.css";
import { ApiResponseApp } from "#/pages/api/app/ingest";

export function SettingsAppName() {

	const context = useDashboardContext();
	const [loading, setLoading] = useState(false);
	const [appName, setAppName] = useState('');

	const app = useAppNoUpdate();

	useEffect(() => {
		if (app) setAppName(app.name);
	}, [app]);

	const handleUpdate = useCallback(() => {
		setLoading(true);
		fetcher<ApiResponseApp>({
			path: "/app",
			method: "PUT",
			body: { name: appName }
		}).then(res => {
			setAppName(res.app.name);
			context.setApp(res);
		})
			.finally(() => setLoading(false))
	}, [appName, context]);

	return <section>
		<h3>Name</h3>
		<p>Change the name of your app.</p>
		<div className={styles.flex}>
			<SkeletonContainer hasLoaded={Boolean(app)} height={42}>
				<Field
					disabled={loading}
					value={appName}
					icon={RxLetterCaseCapitalize}
					onChange={setAppName}
					placeholder='App Name'
				/>
			</SkeletonContainer>
			<Button
				onClick={handleUpdate}
				disabled={loading || !app}
				value="Update"
			/>
		</div>
	</section>
}