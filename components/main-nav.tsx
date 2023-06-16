import * as React from "react"
import Link from "next/link"

import type { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { NavLink } from "./nav-link"

interface MainNavProps {
  items?: NavItem[];
  className?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: ""
  },
  {
    title: "Meta",
    href: "/meta"
  },
  {
    title: "Contacts",
    href: "/contacts"
  },
  {
    title: "Support",
    href: "/support"
  },
  {
    title: "Privacy",
    href: "/privacy"
  },
  {
    title: "Terms",
    href: "/terms"
  },
  {
    title: "Settings",
    href: "/settings/app/general"
  }
]

export function MainNav({ items = NAV_ITEMS, className }: MainNavProps) {
  return (
    <div className={cn("flex gap-6 md:gap-10", className)}>
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map((item) =>
            <NavLink key={item.href} item={item} />
          )}
        </nav>
      ) : null}
    </div>
  )
}
