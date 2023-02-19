import { supabase } from "#/db";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { remark } from "remark";
import { App } from "../types/app";
import html from "remark-html";

export interface MarkdownPageProps {
  app: App;
  markdown: string;
}

export const markdownPageStaticPaths = (
  type: "privacy" | "terms"
): GetStaticPaths => {
  return async () => {
    const { data, error } = await supabase
      .from("app")
      .select(
        `
			id,
			slug,
			enable_privacy,
			enable_terms,
			${type} (
				id,
				created_at
			)
		`
      )
      .eq(type === "privacy" ? "enable_privacy" : "enable_terms", true);

    if (error) throw error;
    if (!data) throw new Error("No data for paths.");

    // @ts-expect-error
    const items = data.filter((v) => v["privacy"] !== null);

    return {
      paths: items.map((row) => ({ params: { slug: row.slug } })),
      fallback: "blocking",
    };
  };
};

export const markdownPageStaticProps = (
  type: "privacy" | "terms"
): GetStaticProps<MarkdownPageProps> => {
  return async (context) => {
    const slug = context.params?.slug;
    if (!slug)
      return {
        notFound: true,
      };

    const { data, error } = await supabase
      .from("app")
      .select()
      .eq("slug", slug);
    const app = data?.[0];
    if (error || !app) {
      return { notFound: true };
    }

    if (
      (type === "privacy" && !app.enable_privacy) ||
      (type === "terms" && !app.enable_terms)
    ) {
      return { notFound: true };
    }

    const { data: markdownData, error: markdownError } = await supabase
      .from(type)
      .select()
      .eq("id", app.id);

    const privacy = markdownData?.[0];
    if (markdownError || !privacy) {
      return { notFound: true };
    }

    const matterResult = matter(privacy.value);
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const markdown = processedContent.toString();

    return {
      props: {
        app,
        markdown,
      },
    };
  };
};
