import AppStoreBadge from "#/components/app-store-badge";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { useApp, useAppData, useAppMeta } from "../app-provider";
import { RxHamburgerMenu } from "react-icons/rx";
import { useCallback, useMemo, useState } from "react";
import { MobileNav } from "./mobile-nav.index";

export function Nav() {

	const { slug, name, enable_contact, enable_privacy, enable_support, enable_terms } = useAppData();
	const { icon, apple_id } = useAppMeta();
	const [showMobileNav, setShowMobileNav] = useState(false);

	const links = useMemo<string[]>(() => {
		const l: string[] = [];
		if (enable_support) l.push("support");
		if (enable_contact) l.push("contact");
		if (enable_privacy) l.push("privacy");
		if (enable_terms) l.push("terms");
		return l;
	}, [enable_contact, enable_privacy, enable_support, enable_terms])

	const toggleMobileNav = useCallback(() => {
		setShowMobileNav(v => !v);
	}, []);

	return <nav className={styles.nav}>
		<Link className={styles.title} href={`/${slug}`}>
			<Image priority className={styles.icon} src={icon} width={64} height={64} alt={`${name} icon`} />
			<h1 className={styles.name}>{name}</h1>
		</Link>
		<ul className={styles.links}>
			{links.map(link => <li key={link}>
				<Link className={styles.link} href={`/${slug}/${link}`}>
					{link}
				</Link>
			</li>)}
		</ul>
		<Link className={styles.badge} href={`https://apps.apple.com/app/id${apple_id}`}>
			<AppStoreBadge />
		</Link>
		<button onClick={toggleMobileNav} className={styles.hamburger}>
			<RxHamburgerMenu className={styles.hamburgerIcon} />
		</button>
		<MobileNav close={() => setShowMobileNav(false)} show={showMobileNav} items={links} />
	</nav>
}