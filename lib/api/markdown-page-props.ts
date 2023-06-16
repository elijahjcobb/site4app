import { GetStaticPaths, GetStaticProps } from "next"
import { prisma, type App, type Meta } from "@/db"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

export interface MarkdownPageProps {
  app: App
  meta: Meta
  markdown: string
}

export const privacyStaticPaths = (): GetStaticPaths => {
  return async () => {
    const data = await prisma.privacy.findMany({
      where: {
        app: {
          enable_privacy: true,
        },
      },
      include: {
        app: true,
      },
    })

    const items = data.filter((v) => v.value !== null)

    return {
      paths: items.map((row) => ({ params: { slug: row.app.slug } })),
      fallback: "blocking",
    }
  }
}

export const termsStaticPaths = (): GetStaticPaths => {
  return async () => {
    try {
      const data = await prisma.terms.findMany({
        where: {
          app: {
            enable_terms: true,
          },
        },
        include: {
          app: true,
        },
      })

      const items = data.filter((v) => v.value !== null)

      return {
        paths: items.map((row) => ({ params: { slug: row.app.slug } })),
        fallback: "blocking",
      }
    } catch {
      return {
        paths: [],
        fallback: "blocking",
      }
    }
  }
}

export const privacyStaticProps = (): GetStaticProps<MarkdownPageProps> => {
  return async (context) => {
    try {
      const slug = context.params?.slug
      if (!slug || typeof slug !== "string") throw new Error("Invalid slug")

      const app = await prisma.app.findUniqueOrThrow({
        where: {
          slug,
        },
      })

      const meta = await prisma.meta.findUniqueOrThrow({
        where: { id: app.id },
      })

      if (!app.enable_privacy)
        throw new Error("Privacy is not enabled for this app.")

      const privacy = await prisma.privacy.findUniqueOrThrow({
        where: { id: app.id },
      })

      const matterResult = matter(privacy.value)
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
      const markdown = processedContent.toString()

      return {
        props: {
          app,
          meta,
          markdown,
        },
      }
    } catch (e) {
      console.error(e)
      return { notFound: true }
    }
  }
}

export const termsStaticProps = (): GetStaticProps<MarkdownPageProps> => {
  return async (context) => {
    try {
      const slug = context.params?.slug
      if (!slug || typeof slug !== "string") throw new Error("Invalid slug")

      const app = await prisma.app.findUniqueOrThrow({
        where: {
          slug,
        },
      })

      const meta = await prisma.meta.findUniqueOrThrow({
        where: { id: app.id },
      })

      if (!app.enable_terms)
        throw new Error("Terms is not enabled for this app.")

      const terms = await prisma.terms.findUniqueOrThrow({
        where: { id: app.id },
      })

      const matterResult = matter(terms.value)
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
      const markdown = processedContent.toString()

      return {
        props: {
          app,
          meta,
          markdown,
        },
      }
    } catch (e) {
      console.error(e)
      return { notFound: true }
    }
  }
}
