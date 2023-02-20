import Link from "next/link";
import { CSSProperties, ReactNode, useCallback, useMemo } from "react";
import { IconType } from "react-icons/lib";
import { BasePage } from "../base-page";
import { Icon } from "../icon";
import styles from "./index.module.css";
import { IoRocket, IoSettings, IoHelpBuoy, IoBug, IoReceipt, IoAccessibility } from "react-icons/io5";
import { useRouter } from "next/router";
import { cx } from "#/lib/front/cx";
import { Button } from "../button";
import { deleteCookie } from "cookies-next";
import { ImSpinner } from "react-icons/im";
import { DashboardProvider, useApp } from "#/components/dashboard-page/dashboard-context";
import { AppPicker } from "./app-picker";

function DashboardLink({
	href,
	icon: Icon,
	name
}: {
	href: string;
	icon: IconType;
	name: string;
}) {

	const router = useRouter();
	const isActive = useMemo(() => {
		if (href === '/dashboard') return href === router.pathname;
		return router.pathname.startsWith(href)
	}, [router, href]);

	return <Link className={cx(styles.dashboardLink, isActive && styles.dashboardLinkActive)} href={href} >
		<Icon className={styles.dashboardLinkIcon} />
		<span>{name}</span>
	</Link>
}

interface DashboardPageProps {
	title?: string;
	children: ReactNode;
	className?: string;
	useMaxWidth?: boolean;
	maxWidth?: number;
	style?: CSSProperties
}
export function DashboardPage(props: DashboardPageProps) {
	return <DashboardProvider>
		<DashboardPageWithoutProvider {...props} />
	</DashboardProvider>
}

function DashboardPageWithoutProvider({
	title,
	children,
	className,
	useMaxWidth = false,
	maxWidth = 720,
	style: userStyles
}: DashboardPageProps) {

	const router = useRouter();
	const project = useApp();

	const handleSignOut = useCallback(() => {
		deleteCookie("authorization");
		deleteCookie("appId");
		router.push("/sign-in");
	}, [router]);

	return <BasePage title={title}>
		<div style={userStyles} className={styles.page}>
			<header className={styles.header}>
				<Link href='/about' className={styles.title}>
					<Icon size={32} />
					<h1>site4app</h1>
				</Link>
				<nav className={styles.nav}>
					<DashboardLink
						href='/dashboard'
						name="Dashboard"
						icon={IoRocket}
					/>
					<DashboardLink
						href='/dashboard/support'
						name="Support"
						icon={IoHelpBuoy}
					/>
					<DashboardLink
						href='/dashboard/responses'
						name="Responses"
						icon={IoBug}
					/>
					<DashboardLink
						href='/dashboard/privacy'
						name="Privacy"
						icon={IoAccessibility}
					/>
					<DashboardLink
						href='/dashboard/terms'
						name="Terms"
						icon={IoReceipt}
					/>
					<DashboardLink
						href='/dashboard/settings'
						name="Settings"
						icon={IoSettings}
					/>
				</nav>
				<AppPicker />
				<div className={styles.buttons}>
					<Button
						secondary
						value="Sign Out"
						onClick={handleSignOut}
					/>
					<Button
						href="/docs"
						newTab
						value="Docs"
					/>
				</div>
			</header>
			<div className={cx(styles.childContainer)}>
				<div style={{
					maxWidth: useMaxWidth ? maxWidth : 'unset',
					padding: useMaxWidth ? 'var(--sp-6) 0' : 0,
				}} className={cx(styles.child, className)}>
					{children}
				</div>
			</div>
		</div>
	</BasePage>
}

export function DashboardPageLoader() {
	return <div className={styles.spinnerContainer}>
		<ImSpinner className={styles.spinner} />
	</div>
}