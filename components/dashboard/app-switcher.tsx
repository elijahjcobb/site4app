"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useFetcher } from "@/lib/front/fetcher"
import { useCallback, useEffect } from "react"
import type { AppWithMeta } from "@/db"
import { getCookie, setCookie } from "cookies-next"
import { Skeleton } from "../ui/skeleton"
import { useRouter } from "next/navigation"


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface AppSwitcherProps extends PopoverTriggerProps { }

export default function AppSwitcher({ className }: AppSwitcherProps) {
	const [open, setOpen] = React.useState(false)
	const [showNewAppDialog, setShowNewAppDialog] = React.useState(false)
	const [apps, setApps] = React.useState<AppWithMeta[]>([]);
	const [selectedApp, setSelectedApp] = React.useState<AppWithMeta | null>(null)
	const router = useRouter();

	const [fetcher, isLoading] = useFetcher({ initialLoading: true });

	useEffect(() => {
		fetcher<AppWithMeta[]>({
			path: "/user/apps/meta",
			method: "GET"
		}).then((apps) => {
			setApps(apps);
			const appId = getCookie("appId");
			const app = apps.find((app) => app.id === appId) ?? apps[0];
			if (app) setSelectedApp(app);
		}).catch(console.error);
	}, [fetcher]);

	const handleSelect = useCallback((app: AppWithMeta) => {
		setSelectedApp(app)
		setOpen(false)
		setCookie("appId", app.id);
		router.refresh();
	}, [router]);

	if (isLoading) return <Skeleton className="h-[36px] w-[200px] border border-input" />

	return (
		<Dialog open={showNewAppDialog} onOpenChange={setShowNewAppDialog}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						role="combobox"
						aria-expanded={open}
						aria-label="Select an app"
						className={cn("w-[200px] justify-between", className)}
					>
						<Avatar className="mr-2 h-5 w-5">
							<AvatarImage
								src={selectedApp?.meta?.icon ?? `https://avatar.vercel.sh/${selectedApp?.id}.png`}
								alt={selectedApp?.name}
							/>
						</Avatar>
						{selectedApp?.name}
						<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandList>
							<CommandInput placeholder="Search app..." />
							<CommandEmpty>No app found.</CommandEmpty>
							<CommandGroup>
								{apps.map((app) => (
									<CommandItem
										key={app.id}
										onSelect={() => handleSelect(app)}
										className="text-sm"
									>
										<Avatar className="mr-2 h-5 w-5">
											<AvatarImage
												src={app.meta?.icon ?? `https://avatar.vercel.sh/${app.id}.png`}
												alt={app.name}
											/>
											<AvatarFallback>SC</AvatarFallback>
										</Avatar>
										{app.name}
										<Check
											className={cn(
												"ml-auto h-4 w-4",
												selectedApp?.id === app.id
													? "opacity-100"
													: "opacity-0"
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<DialogTrigger asChild>
									<CommandItem
										onSelect={() => {
											setOpen(false)
											setShowNewAppDialog(true)
										}}
									>
										<PlusCircle className="mr-2 h-5 w-5" />
										Create App
									</CommandItem>
								</DialogTrigger>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create App</DialogTitle>
					<DialogDescription>
						Add a new app to manage products and customers.
					</DialogDescription>
				</DialogHeader>
				<div>
					<div className="space-y-4 py-2 pb-4">
						<div className="space-y-2">
							<Label htmlFor="name">App name</Label>
							<Input id="name" placeholder="Acme Inc." />
						</div>
						<div className="space-y-2">
							<Label htmlFor="plan">Subscription plan</Label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select a plan" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="free">
										<span className="font-medium">Free</span> -{" "}
										<span className="text-muted-foreground">
											Trial for two weeks
										</span>
									</SelectItem>
									<SelectItem value="pro">
										<span className="font-medium">Pro</span> -{" "}
										<span className="text-muted-foreground">
											$9/month per user
										</span>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setShowNewAppDialog(false)}>
						Cancel
					</Button>
					<Button type="submit">Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}