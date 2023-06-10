"use client";

import { cn } from "@/lib/utils"
import type { NavItem } from "@/types/nav"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react";

export function NavLink({ item }: { item: NavItem }): JSX.Element {

	const currentPath = usePathname();
	const pathname = useMemo<string>(() => `/dashboard${item.href}`, [item.href]);

	const isOnPath = useMemo<boolean>(() => {
		return currentPath.replace("/dashboard", "") === item.href;
	}, [currentPath, item.href]);

	return <Link
		key={item.href}
		href={pathname}
		className={cn(
			"flex items-center text-sm font-medium text-muted-foreground",
			"hover:text-foreground",
			isOnPath && "text-foreground",
			item.disabled && "cursor-not-allowed opacity-80"
		)}
	>
		{item.title}
	</Link>
}