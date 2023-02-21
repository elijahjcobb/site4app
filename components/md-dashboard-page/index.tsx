import { DashboardPage } from "#/components/dashboard-page";
import { Button } from "../button";
import Editor, { OnChange } from "@monaco-editor/react";
import styles from "./index.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import mdStyles from "../client/markdown-page/index.module.css";
import { cx } from "#/lib/front/cx";
import { useDebounce } from "#/lib/front/use-debounce";
import { useTheme } from "#/lib/front/use-theme";
import { Spinner } from "../spinner";
import { fetcher, useFetch } from "#/lib/front/fetcher";
import { ApiResponsePrivacy } from "#/pages/api/privacy";
import { ApiResponseTerms } from "#/pages/api/terms";
import { useApp } from "../dashboard-page/dashboard-context";

interface MarkdownDashboardPageProps {
	type: "privacy" | "terms";
}

export function MarkdownDashboardPage(props: MarkdownDashboardPageProps) {
	return <DashboardPage className={styles.page} title={props.type}>
		<MarkdownDashboardPageWithoutProvider {...props} />
	</DashboardPage>
}

function MarkdownDashboardPageWithoutProvider({
	type
}: MarkdownDashboardPageProps): JSX.Element {

	const [source, setSource] = useState("");
	const debouncedSource = useDebounce(source, 1000);
	const [loading, setLoading] = useState(true);
	const [markdown, setMarkdown] = useState("");
	const theme = useTheme();
	const app = useApp();

	const [initialMarkdown] = useFetch<ApiResponsePrivacy | ApiResponseTerms>({
		path: `/${type}`,
		method: "GET"
	})

	useEffect(() => {
		if (initialMarkdown) {
			setSource(initialMarkdown.value.value);
			setLoading(false);
		}
	}, [initialMarkdown]);

	const handleChange: OnChange = useCallback(async (value) => {
		if (value) setSource(value);
		else setSource("");
	}, []);

	useEffect(() => {
		(async () => {
			const matterResult = matter(debouncedSource);
			const processedContent = await remark()
				.use(html)
				.process(matterResult.content);
			const markdown = processedContent.toString();
			setMarkdown(markdown);
		})().catch(console.error);
	}, [debouncedSource]);

	const save = useCallback(() => {
		setLoading(true);
		fetcher({
			path: `/${type}`,
			method: "POST",
			body: {
				value: source
			}
		})
			.finally(() => {
				setLoading(false);
			})
	}, [source, type]);

	const title = useMemo(() => type === 'privacy' ? "Privacy Policy" : "Terms and Conditions", [type]);

	return <>
		<div className={styles.header}>
			<h2>{title}</h2>
			<Button href={`/${app?.slug}/${type}`} newTab secondary value="View" />
			<Button disabled={loading} onClick={save} value="Save" />
		</div>
		<div className={styles.content}>
			<Editor
				className={styles.editor}
				language="md"
				defaultLanguage="md"
				theme={theme === 'dark' ? "vs-dark" : "light"}
				value={source}
				onChange={handleChange}
			/>
			<div className={cx(styles.preview, mdStyles.md)} dangerouslySetInnerHTML={{ __html: markdown }} />
			<div className={cx(styles.loadingContainer, loading && styles.loading)}>
				<Spinner />
			</div>
		</div>
	</>
}