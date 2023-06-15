"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function TokensManager(): JSX.Element {

	const [tokenName, setTokenName] = useState('');

	return <div>
		<Dialog>
			<DialogTrigger asChild>
				<Button>Create token</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create New API Token</DialogTitle>
					<DialogDescription>
						Provide a name for a new API token. This token can be used to authenticate with our REST API.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input id="name" onChange={ev => setTokenName(ev.target.value)} value={tokenName} placeholder="my-test-token" className="col-span-3" />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Create token</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	</div>
}