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

const groups = [
	{
		label: "Apps",
		apps: [
			{
				label: "Acme Inc.",
				value: "acme-inc",
			},
			{
				label: "Monsters Inc.",
				value: "monsters",
			}
		],
	},
]

type App = (typeof groups)[number]["apps"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface AppSwitcherProps extends PopoverTriggerProps { }

export default function AppSwitcher({ className }: AppSwitcherProps) {
	const [open, setOpen] = React.useState(false)
	const [showNewAppDialog, setShowNewAppDialog] = React.useState(false)
	const [selectedApp, setSelectedApp] = React.useState<App>(
		groups[0].apps[0]
	)

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
								src={`https://avatar.vercel.sh/${selectedApp.value}.png`}
								alt={selectedApp.label}
							/>
							<AvatarFallback>SC</AvatarFallback>
						</Avatar>
						{selectedApp.label}
						<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandList>
							<CommandInput placeholder="Search app..." />
							<CommandEmpty>No app found.</CommandEmpty>
							{groups.map((group) => (
								<CommandGroup key={group.label}>
									{group.apps.map((app) => (
										<CommandItem
											key={app.value}
											onSelect={() => {
												setSelectedApp(app)
												setOpen(false)
											}}
											className="text-sm"
										>
											<Avatar className="mr-2 h-5 w-5">
												<AvatarImage
													src={`https://avatar.vercel.sh/${app.value}.png`}
													alt={app.label}
												/>
												<AvatarFallback>SC</AvatarFallback>
											</Avatar>
											{app.label}
											<Check
												className={cn(
													"ml-auto h-4 w-4",
													selectedApp.value === app.value
														? "opacity-100"
														: "opacity-0"
												)}
											/>
										</CommandItem>
									))}
								</CommandGroup>
							))}
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