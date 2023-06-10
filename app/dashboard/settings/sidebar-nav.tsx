"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
	header: string;
	items: {
		href: string
		title: string
	}[]
}

export function SidebarNav({ className, header, items, ...props }: SidebarNavProps) {
	const pathname = usePathname()

	return (
		<nav
			className={cn(
				"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
				className
			)}
			{...props}
		>
			<span className="mt-6 px-4 py-2 text-xs font-bold uppercase opacity-30">{header}</span>
			{items.map((item) => {
				const href = `/dashboard/settings${item.href}`;
				return <Link
					key={item.href}
					href={href}
					className={
						cn(
							buttonVariants({ variant: "ghost" }),
							pathname === href
								? "bg-muted text-foreground hover:bg-muted"
								: "text-muted-foreground hover:bg-transparent",
							"justify-start"
						)}
				>
					{item.title}
				</Link>
			})}
		</nav >
	)
}