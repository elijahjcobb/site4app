import { Button } from "#/components/button";
import { fetcher } from "#/lib/fetcher";
import { ApiResponseApp } from "#/pages/api/app/ingest";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";

export function SettingsAppDelete() {

	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleDelete = useCallback(() => {
		setLoading(true);
		fetcher<ApiResponseApp>({
			path: "/app",
			method: "DELETE"
		}).then(() => router.push("/apps"))
			.finally(() => setLoading(false));
	}, [router]);

	return <section>
		<h3>Delete App</h3>
		<p>Delete your current app. This action is irreversible.</p>
		<Button
			disabled={loading}
			onClick={handleDelete}
			destructive
			value="Delete App"
		/>
	</section>
}