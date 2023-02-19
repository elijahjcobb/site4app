import { cx } from "#/lib/front/cx";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { BsChevronRight } from "react-icons/bs";
import { Button } from "#/components/button";
import { DashboardPageLoader } from "#/components/dashboard-page";
import { MarketingPage } from "#/components/marketing-page";
import { setCookie30Day } from "lib/cookie";
import { useFetch } from "#/lib/fetcher";
import styles from "#/styles/projects.module.css";
import { truncate } from "#/lib/front/truncate";
import { ApiResponseAppAllWithMeta } from "../api/app/all/meta";
import { AppWithMeta } from "#/lib/api/fetchers";
import Image from "next/image";
import { getAppIconWithFallback } from "#/lib/front/app-icon-fallback";

export default function ProjectsPage() {

	const [apps] = useFetch<ApiResponseAppAllWithMeta>({
		path: "/app/all/meta",
		method: "GET",
	});

	return <MarketingPage hideHeader title="projects">
		{apps ? <div className={styles.page}>
			<div className={styles.container}>
				<div className={styles.top}>
					<h1>Select an App</h1>
					<Button
						secondary
						href="/apps/create"
						value="Create"
					/>
				</div>
				<ProjectsTable apps={apps} />
			</div>
		</div> : <DashboardPageLoader />}
	</MarketingPage>
}

export function ProjectsPickerRow({
	app,
	className,
	onClick,
	reload = false
}: {
	app: AppWithMeta,
	className?: string
	onClick?: () => void;
	reload?: boolean;
}) {

	const router = useRouter();

	const handleClick = useCallback(() => {
		setCookie30Day('appId', app.id);
		if (reload) router.reload();
		else router.push("/dashboard");
		if (onClick) onClick();
	}, [app.id, reload, router, onClick]);

	return <BaseProjectsPickerRow
		icon={BsChevronRight}
		value={app.name}
		onClick={handleClick}
		className={className}
		image={getAppIconWithFallback(app)}
	/>
}

export function BaseProjectsPickerRow({
	icon: Icon,
	value,
	onClick,
	className,
	image
}: {
	icon: IconType,
	value: string,
	onClick?: () => void,
	className?: string,
	image: string;
}) {
	return <button onClick={onClick} className={cx(styles.row, className)}>
		<Image className={styles.image} alt={`${value} app icon`} src={image} width={48} height={48} />
		<div className={styles.left}>
			<span>{truncate(value, 32)}</span>
		</div>
		<Icon size={18} />
	</button>
}

function ProjectsTable({ apps }: { apps: ApiResponseAppAllWithMeta }) {
	return <div className={styles.table}>
		{apps.apps.map(data => <ProjectsPickerRow key={data.id} app={data} />)}
	</div>
}