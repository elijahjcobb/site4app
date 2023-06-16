import { GetStaticPaths, GetStaticProps } from "next"
import { prisma, type Prisma } from "@/db"

import { AppProviderProps } from "@/components/client/app-provider"

export const clientGetStaticPathsWithFilter: (
  type?: "enable_contact" | "enable_privacy" | "enable_terms" | "enable_support"
) => GetStaticPaths = (type) => {
  return async () => {
    const where: Partial<Prisma.AppWhereInput> = {}
    if (type) where[type] = true
    const paths = await prisma.app.findMany({
      select: {
        slug: true,
      },
      where,
    })

    return {
      paths: paths.map((app) => ({ params: { slug: app.slug } })),
      fallback: "blocking",
    }
  }
}

export const clientGetStaticPaths: GetStaticPaths =
  clientGetStaticPathsWithFilter()

export const clientGetStaticPropsWithFilter: (
  type?: "enable_contact" | "enable_privacy" | "enable_terms" | "enable_support"
) => GetStaticProps<AppProviderProps> = (type) => {
  return async (context) => {
    const slug = context.params?.slug
    if (!slug || typeof slug !== "string")
      return {
        notFound: true,
      }

    const where: Partial<Prisma.AppWhereInput> = {}
    if (type) where[type] = true
    const app = await prisma.app.findFirst({
      where: {
        ...where,
        slug,
      },
    })
    if (!app) {
      return { notFound: true }
    }

    const meta = await prisma.meta.findUnique({
      where: {
        id: app.id,
      },
    })

    if (!meta) {
      return { notFound: true }
    }

    // @ts-expect-error - just delete the fields we don't need
    delete app.created_at
    // @ts-expect-error - just delete the fields we don't need
    delete app.updated_at
    // @ts-expect-error - just delete the fields we don't need
    delete meta.created_at
    // @ts-expect-error - just delete the fields we don't need
    delete meta.updated_at
    // @ts-expect-error - just delete the fields we don't need
    delete meta.release_date

    return {
      props: {
        app,
        meta,
      },
    }
  }
}

export const clientGetStaticProps = clientGetStaticPropsWithFilter()
