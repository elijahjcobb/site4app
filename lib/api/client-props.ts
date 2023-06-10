import { AppProviderProps } from "#/components/client/app-provider";
import { type Prisma, prisma } from "#/db";
import { GetStaticPaths, GetStaticProps } from "next";

export const clientGetStaticPathsWithFilter: (
  type?: "enable_contact" | "enable_privacy" | "enable_terms" | "enable_support"
) => GetStaticPaths = (type) => {
  return async () => {
    const where: Partial<Prisma.AppWhereInput> = {};
    if (type) where[type] = true;
    const paths = await prisma.app.findMany({
      select: {
        slug: true,
      },
      where,
    });

    return {
      paths: paths.map((app) => ({ params: { slug: app.slug } })),
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
    if (!slug || typeof slug !== "string")
      return {
        notFound: true,
      };

    const where: Partial<Prisma.AppWhereInput> = {};
    if (type) where[type] = true;
    const app = await prisma.app.findFirst({
      where: {
        ...where,
        slug,
      },
    });
    if (!app) {
      return { notFound: true };
    }

    const meta = await prisma.meta.findUnique({
      where: {
        id: app.id,
      },
    });

    if (!meta) {
      return { notFound: true };
    }

    return {
      props: {
        app,
        meta,
      },
    };
  };
};

export const clientGetStaticProps = clientGetStaticPropsWithFilter();
