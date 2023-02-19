import { Page } from "../page";

export function MarkdownPage({
	markdown,
	title
}: {
	markdown: string;
	title: string;
}) {
	return <Page>
		<h1>{title}</h1>
		<div dangerouslySetInnerHTML={{ __html: markdown }} />
	</Page>
}