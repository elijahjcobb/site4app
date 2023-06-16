import { Metadata } from "next"
import Image from "next/image"
import AppSwitcher from "@/components/dashboard/app-switcher"
import { UserNav } from "@/components/dashboard/user-nav"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAppFromServerSession, getUserFromServerSession } from "@/lib/api/verify-user"
import { DashboardContext } from "./context"
import { pickUser } from "@/lib/pick"

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Example dashboard app using the components.",
}

export default async function DashboardPage({ children }: { children: JSX.Element }) {

	const user = await getUserFromServerSession();
	const app = await getAppFromServerSession(user);

	return (
		<DashboardContext app={app} user={pickUser(user)}>
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
			<div className="hidden flex-col md:flex">
				<div className="sticky top-0 border-b bg-background">
					<div className="flex h-16 items-center px-4">
						<AppSwitcher />
						<MainNav className="mx-6" />
						<div className="ml-auto flex items-center space-x-4">
							<Link href={`/${app.slug}`} target="_blank">
								<Button variant='secondary'>View Site</Button>
							</Link>
							<UserNav />
						</div>
					</div>
				</div>
				<div className="flex-1 space-y-4 p-8 pt-6">
					{children}
				</div>
			</div>
		</DashboardContext>
	)
}