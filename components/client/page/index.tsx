import { PropsWithChildren } from "react";
import { Nav } from "../nav";
import styles from "./index.module.css";
import { useApp } from "../app-provider";
import Head from "next/head";

export function Page({
	children
}: PropsWithChildren) {

	const { name, icon_small } = useApp();

	return <div className={styles.page}>
		<Head>
			<title>{name}</title>
			<link rel="icon" href={icon_small} />
		</Head>
		<Nav />
		<div className={styles.container}>
			{children}
		</div>
	</div>
}