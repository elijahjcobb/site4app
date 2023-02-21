
import { Button } from "#/components/button";
import { useAppNoUpdate, useDashboardContext } from "#/components/dashboard-page/dashboard-context";
import { fetcher } from "#/lib/front/fetcher";
import { useState, useEffect, useCallback } from "react";
import { IoHelpBuoy, IoBug, IoReceipt, IoAccessibility } from "react-icons/io5";
import styles from "../index.module.css";
import { ApiResponseApp } from "#/pages/api/app/ingest";
import { Toggle } from "#/components/toggle";
import { cx } from "#/lib/front/cx";
import { SkeletonContainer } from "#/components/skeleton";

export function SettingsAppPages() {

	const context = useDashboardContext();
	const [loading, setLoading] = useState(false);

	const [support, setSupport] = useState(false);
	const [privacy, setPrivacy] = useState(false);
	const [contact, setContact] = useState(false);
	const [terms, setTerms] = useState(false);

	const app = useAppNoUpdate();

	useEffect(() => {
		if (app) {
			setSupport(app.enable_support);
			setPrivacy(app.enable_privacy);
			setContact(app.enable_contact);
			setTerms(app.enable_terms);
		}
	}, [app]);

	const handleUpdate = useCallback(() => {
		setLoading(true);
		fetcher<ApiResponseApp>({
			path: "/app",
			method: "PUT",
			body: {
				enable_support: support,
				enable_privacy: privacy,
				enable_contact: contact,
				enable_terms: terms,
			}
		}).then(res => {
			setSupport(res.app.enable_support);
			setPrivacy(res.app.enable_privacy);
			setContact(res.app.enable_contact);
			setTerms(res.app.enable_terms);
			context.setApp(res);
		})
			.finally(() => setLoading(false))
	}, [support, privacy, contact, terms, context]);

	return <section>
		<h3>Pages</h3>
		<p>Select which pages you would like to enable for your app.</p>
		<div className={cx(styles.flex, styles.toggles)} >
			<Toggle
				disabled={loading}
				value={support}
				onChange={setSupport}
				label='Support'
				icon={IoHelpBuoy}
			/>
			<Toggle
				disabled={loading}
				value={contact}
				onChange={setContact}
				label='Contact'
				icon={IoBug}
			/>
			<Toggle
				disabled={loading}
				value={privacy}
				onChange={setPrivacy}
				label='Privacy'
				icon={IoAccessibility}
			/>
			<Toggle
				disabled={loading}
				value={terms}
				onChange={setTerms}
				label='Terms'
				icon={IoReceipt}
			/>
			<Button
				onClick={handleUpdate}
				disabled={loading || !app}
				value="Update"
			/>
		</div>
	</section>
}