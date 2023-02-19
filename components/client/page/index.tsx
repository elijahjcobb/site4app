import { PropsWithChildren, useMemo } from "react";
import { Nav } from "../nav";
import styles from "./index.module.css";
import { useApp } from "../app-provider";
import Head from "next/head";

export function Page({
	children
}: PropsWithChildren) {

	const { name, icon_small, icon, theme } = useApp();

	const orgUrl = useMemo(() => {
		const ogImageParams = new URLSearchParams();
		if (theme) ogImageParams.set("theme", theme);
		ogImageParams.set("icon", icon);
		return `https://site4.app/api/og?${ogImageParams.toString()}`
	}, [theme, icon]);

	return <div className={styles.page}>
		<Head>
			<title>{name}</title>
			<link rel="icon" href={icon_small} />
			<meta name='description' content={`View ${name} on site4.app.`} />
			<meta property="og:image" content={orgUrl} />
			<meta property="og:title" content={name} />
			<meta property="og:description" content={`View ${name} on site4.app.`} />
		</Head>
		<Nav />
		<div className={styles.container}>
			{children}
		</div>
	</div>
}