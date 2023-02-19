import Link from "next/link";
import { useApp } from "../app-provider";
import styles from "./index.module.css";

export function Callout() {

	const { slug } = useApp();

	return <div className={styles.container}>
		<div>
			<h2>Need more help?</h2>
		</div>
		<Link className={styles.cta} href={`/${slug}/contact`}>
			Contact
		</Link>
	</div>
}