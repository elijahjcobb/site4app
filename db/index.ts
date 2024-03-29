import {
  PrismaClient,
  type App,
  type Billing,
  type Contact,
  type Meta,
  type Privacy,
  type Support,
  type Terms,
  type Token,
  type User,
} from "@prisma/client"

export const prisma = new PrismaClient()

export type { Prisma } from "@prisma/client"

export type Table =
  | App
  | Meta
  | Token
  | Contact
  | Support
  | Privacy
  | Terms
  | Billing
  | User
export type {
  App,
  Meta,
  Contact,
  Support,
  Privacy,
  Terms,
  Billing,
  User,
  Token,
}
export type AppWithMeta = App & { meta?: Meta | null }
