import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useFetch } from "lib/front/fetch"
import { APIResponseUserProjects } from "#api/user/projects"
import { IoChevronUpCircle, IoAdd } from "react-icons/io5";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { cx } from "#/lib/front/cx";
import { BaseProjectsPickerRow, ProjectsPickerRow } from "#/pages/apps";
import { useDashboardContext } from "#/components/dashboard-page/dashboard-context";
import { PlanBadge } from "#/components/badge";
import { truncate } from "#/lib/front/truncate";
import { ApiResponseAppWithMeta } from "#/pages/api/app/meta";

export function AppPicker() {

	const router = useRouter();

	const [app, setApp] = useState<ApiResponseAppWithMeta | undefined>(undefined);
	const [showOverlay, setShowOverlay] = useState(false);

	const context = useDashboardContext();

	const [data] = useFetch<APIResponseUserProjects>({
		path: "/user/projects",
		method: "get",
		scope: "user"
	});

	useEffect(() => {
		if (!data) return;
		const projectId = getCookie("projectId");
		if (!projectId) return;
		for (const d of data) {
			if (d.project.id === projectId) {
				setApp(d.project);
				return
			}
		}
		router.push("/projects");
	}, [data, router]);

	useEffect(() => {
		if (context.project) setApp({ ...context.project });
	}, [context.project]);

	return <div className={styles.container}>
		{data ? <div className={cx(styles.overlay, showOverlay && styles.show)}>
			<BaseProjectsPickerRow
				value="Create Project"
				className={styles.create}
				icon={IoAdd}
				onClick={() => router.push("/projects/create")}
			/>
			{data.map(d => <ProjectsPickerRow
				onClick={() => setShowOverlay(false)}
				className={styles.row}
				key={d.project.id}
				reload
				data={d} />)}
		</div> : null}
		<button
			onClick={() => setShowOverlay(v => !v)}
			className={styles.picker}>
			{app ? <>
				<span>{truncate(app.name, 22)}</span>
				<IoChevronUpCircle className={cx(styles.icon, showOverlay && styles.iconFlip)} />
			</> : null}
		</button>
	</div>
}