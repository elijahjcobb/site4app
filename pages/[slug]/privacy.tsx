import { AppProvider } from "@/components/client/app-provider";
import { MarkdownPage } from "@/components/client/markdown-page";
import { MarkdownPageProps, markdownPageStaticPaths, markdownPageStaticProps } from "@/lib/api/markdown-page-props";


export default function Page(props: MarkdownPageProps) {
	return <AppProvider app={props.app} meta={props.meta}>
		<MarkdownPage title="Privacy Policy" markdown={props.markdown} />
	</AppProvider>
}

export const getStaticProps = markdownPageStaticProps("privacy");
export const getStaticPaths = markdownPageStaticPaths("privacy");