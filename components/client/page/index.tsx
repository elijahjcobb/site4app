import { PropsWithChildren } from "react";
import { Nav } from "../nav";
import styles from "./index.module.css";
import { useApp } from "../app-provider";
import Head from "next/head";

export function Page({
	children
}: PropsWithChildren) {

	const { name, icon_small, icon } = useApp();

	return <div className={styles.page}>
		<Head>
			<title>{name}</title>
			<link rel="icon" href={icon_small} />
			<meta name='description' content={`View ${name} on site4.app.`} />
			<meta property="og:image" content={`https://site4.app/api/og?app=${name}&icon=${icon}`} />
			<meta property="og:title" content={name} />
			<meta property="og:description" content={`View ${name} on site4.app.`} />
		</Head>
		<Nav />
		<div className={styles.container}>
			{children}
		</div>
	</div>
}