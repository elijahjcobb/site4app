import { AppProvider, AppProviderProps } from "#/components/client/app-provider";
import { SupportPage, SupportPageProps } from "#/components/client/support";
import { SupportItemProps } from "#/components/client/support/support-item";
import { supabase } from "#/db";
import { clientGetStaticPathsWithFilter, clientGetStaticProps } from "#/lib/api/client-props";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import { remark } from "remark";
import html from "remark-html";

type Props = AppProviderProps & SupportPageProps;

export default function Page(props: Props) {
	return <AppProvider app={props.app} meta={props.meta}>
		<SupportPage items={props.items} />
	</AppProvider>
}

export const getStaticPaths = clientGetStaticPathsWithFilter("enable_support");

export const getStaticProps: GetStaticProps<Props> = async (context) => {

	const defaultProps = await clientGetStaticProps(context) as { props: AppProviderProps };

	if (!defaultProps.props.app.enable_support) {
		return { notFound: true }
	}

	const appId = defaultProps.props.app.id;
	const { data, error } = await supabase.from("support").select().eq("app_id", appId);

	if (error || !data || data?.length === 0) {
		return {
			notFound: true
		}
	}

	const items: SupportItemProps[] = [];

	for (const item of data) {

		const matterResult = matter(item.answer);
		const processedContent = await remark()
			.use(html)
			.process(matterResult.content);
		const markdown = processedContent.toString();

		items.push({
			id: item.id,
			question: item.question,
			answer: markdown
		})
	}

	return {
		props: {
			...defaultProps.props,
			items
		}
	}
};