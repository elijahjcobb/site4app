import { ReactNode } from "react";
import { Footer } from "../footer";
import { Header } from "../header";
import styles from "./index.module.css";
import { cx } from "#/lib/front/cx";
import { BasePage } from "../base-page";

export function MarketingPage({
	children,
	hideFooter = false,
	hideHeader = false,
	title
}: {
	children: ReactNode;
	hideHeader?: boolean;
	hideFooter?: boolean;
	title?: string;

}) {

	return <BasePage title={title}>
		{hideHeader ? null : <Header />}
		<div className={cx(
			styles.children,
			!hideFooter && styles.fullHeight,
			hideHeader && !hideFooter && styles.fullHeightWithoutNav
		)}>
			{children}
		</div>
		{hideFooter ? null : <Footer />}
	</BasePage>
}