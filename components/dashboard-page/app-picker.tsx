import Link from "next/link";
import styles from "./app-picker.module.css";
import { useApp } from "./dashboard-context";
import { getAppIconWithFallback } from "#/lib/front/app-icon-fallback";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import { Skeleton } from "../skeleton";
import { cx } from "#/lib/front/cx";

export function AppPicker(): JSX.Element {

	const app = useApp();

	return <div className={styles.container}>
		<Link className={styles.link} href="/apps">
			<Image className={styles.image} src={getAppIconWithFallback(app)} alt={'app icon'} width={36} height={36} />
			<p className={styles.name}>{app?.name}</p>
			<FaChevronRight className={styles.arrow} />
		</Link>
		<Skeleton className={cx(styles.skeleton, app === undefined && styles.show)} height={54} />
	</div>
}