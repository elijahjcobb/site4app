import { Page } from "../page";
import styles from "./index.module.css";

export function MarkdownPage({
	markdown,
	title
}: {
	markdown: string;
	title: string;
}) {
	return <Page>
		<h1>{title}</h1>
		<div className={styles.md} dangerouslySetInnerHTML={{ __html: markdown }} />
	</Page>
}