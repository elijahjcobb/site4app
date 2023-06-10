import { Metadata } from "next"
import Image from "next/image"
import AppSwitcher from "@/components/dashboard/app-switcher"
import { UserNav } from "@/components/dashboard/user-nav"
import { MainNav } from "@/components/main-nav"

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Example dashboard app using the components.",
}

export default function DashboardPage({ children }: { children: JSX.Element }) {
	return (
		<>
			<div className="md:hidden">
				<Image
					src="/examples/dashboard-light.png"
					width={1280}
					height={866}
					alt="Dashboard"
					className="block dark:hidden"
				/>
				<Image
					src="/examples/dashboard-dark.png"
					width={1280}
					height={866}
					alt="Dashboard"
					className="hidden dark:block"
				/>
			</div>
			<div className=" hidden flex-col md:flex">
				<div className="sticky top-0 border-b">
					<div className="flex h-16 items-center px-4">
						<AppSwitcher />
						<MainNav className="mx-6" />
						<div className="ml-auto flex items-center space-x-4">
							<UserNav />
						</div>
					</div>
				</div>
				<div className="flex-1 space-y-4 p-8 pt-6">
					{children}
				</div>
			</div>
		</>
	)
}