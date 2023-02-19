import { AppProviderProps } from "#/components/client/app-provider";
import { supabase } from "#/db";
import { GetStaticPaths, GetStaticProps } from "next";

export const clientGetStaticPathsWithFilter: (
  type?: "enable_contact" | "enable_privacy" | "enable_terms" | "enable_support"
) => GetStaticPaths = (type) => {
  return async () => {
    let builder = supabase.from("app").select(`slug`);
    if (type) builder = builder.eq(type, true);
    const { data, error } = await builder;

    if (error) throw error;
    if (!data) throw new Error("No paths to generate!");

    return {
      paths: data.map((app) => ({ params: { slug: app.slug } })),
      fallback: "blocking",
    };
  };
};

export const clientGetStaticPaths: GetStaticPaths =
  clientGetStaticPathsWithFilter();

export const clientGetStaticPropsWithFilter: (
  type?: "enable_contact" | "enable_privacy" | "enable_terms" | "enable_support"
) => GetStaticProps<AppProviderProps> = (type) => {
  return async (context) => {
    const slug = context.params?.slug;
    if (!slug)
      return {
        notFound: true,
      };

    let builder = supabase.from("app").select().eq("slug", slug);
    if (type) builder = builder.eq(type, true);
    const { data, error } = await builder;
    const app = data?.[0];
    if (error || !app) {
      return { notFound: true };
    }

    return {
      props: {
        app,
      },
    };
  };
};

export const clientGetStaticProps = clientGetStaticPropsWithFilter();
