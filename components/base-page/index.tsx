import Head from "next/head";
import { ReactNode, useMemo } from "react";


export function BasePage({
	children,
	title: pageTitle
}: {
	children: ReactNode;
	title?: string;
}) {

	const title = useMemo(() => {
		if (!pageTitle) return "site4app";
		return `${pageTitle} | site4app`
	}, [pageTitle])

	return <div>
		<Head>
			<title>{title}</title>
			<link rel="icon" href={"/icon.svg"} />
		</Head>
		{children}
	</div>
}