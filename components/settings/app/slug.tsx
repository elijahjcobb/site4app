
import { Button } from "#/components/button";
import { useAppNoUpdate, useDashboardContext } from "#/components/dashboard-page/dashboard-context";
import { Field } from "#/components/field";
import { SkeletonContainer } from "#/components/skeleton";
import { fetcher } from "#/lib/fetcher";
import { useState, useEffect, useCallback } from "react";
import { FaSlackHash } from "react-icons/fa";
import styles from "../index.module.css";
import { ApiResponseApp } from "#/pages/api/app/ingest";

export function SettingsAppSlug() {

	const context = useDashboardContext();
	const [loading, setLoading] = useState(false);
	const [appSlug, setAppSlug] = useState('');

	const app = useAppNoUpdate();

	useEffect(() => {
		if (app) setAppSlug(app.slug);
	}, [app]);

	const handleUpdate = useCallback(() => {
		setLoading(true);
		fetcher<ApiResponseApp>({
			path: '/app',
			method: "PUT",
			body: { slug: appSlug }
		}).then(res => {
			setAppSlug(res.app.slug);
			context.setApp(res);
		})
			.finally(() => setLoading(false))
	}, [appSlug, context]);

	return <section>
		<h3>Slug</h3>
		<p>Change the slug for your app.</p>
		<div className={styles.flex}>
			<SkeletonContainer hasLoaded={Boolean(app)} height={42}>
				<Field
					disabled={loading}
					value={appSlug}
					icon={FaSlackHash}
					onChange={setAppSlug}
					placeholder='App Slug'
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