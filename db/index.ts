import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

import type {
  App,
  Meta,
  Contact,
  Support,
  Privacy,
  Terms,
  User,
  Billing,
} from "@prisma/client";

export type { Prisma } from "@prisma/client";

export type Table =
  | App
  | Meta
  | Contact
  | Support
  | Privacy
  | Terms
  | Billing
  | User;
export type { App, Meta, Contact, Support, Privacy, Terms, Billing, User };
export type AppWithMeta = App & { meta?: Meta | null };
