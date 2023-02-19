import { PropsWithChildren } from "react";
import { Nav } from "../nav";
import styles from "./index.module.css";

export function Page({
	children
}: PropsWithChildren) {
	return <div className={styles.page}>
		<Nav />
		<div className={styles.container}>
			{children}
		</div>
	</div>
}