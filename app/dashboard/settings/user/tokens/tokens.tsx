"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { fetcher } from "@/lib/front/fetcher";
import type { ClientToken, } from "@/lib/pick";
import { last, truncate } from "lodash";
import { Trash } from "lucide-react";
import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

export function TokensManager(): JSX.Element {

	const [tokenName, setTokenName] = useState('');
	const [tokens, setTokens] = useState<(ClientToken | string)[]>([]);

	const submit = useCallback(() => {
		setShowDialogue(false);
		setTokens(v => [...v, tokenName]);
		fetcher<ClientToken>({
			path: "/user/tokens",
			method: "POST",
			body: {
				name: tokenName
			}
		})
			.then(token => {
				setTokens(old => {
					const oldWithoutThisName = old.filter(t => {
						if (typeof t === "string" && token.name === t) return false;
						return true;
					})
					return [...oldWithoutThisName, token];
				});
			}).finally(() => {
				setTokenName('');
			})
	}, [tokenName]);

	useEffect(() => {
		fetcher<ClientToken[]>({
			path: "/user/tokens",
			method: "GET"
		})
			.then(setTokens)
			.catch(console.error)
	}, []);

	const [showDialogue, setShowDialogue] = useState(false);

	const rows = useMemo(() => {

		if (tokens.length === 0) {
			return <TokenSkeleton />
		}

		return tokens.map((token) => {
			if (typeof token === "string") return <TokenSkeleton value={token} key={token} />
			return <TokenRow remove={() => {
				setTokens(old => old.filter(t => {
					if (typeof t === "string") return true;
					if (t.id === token.id) return false;
					return true;
				}));
			}} key={token.id} token={token} />
		});

	}, [tokens]);

	return <div className="flex flex-col gap-4">

		<Dialog open={showDialogue} onOpenChange={setShowDialogue}>
			<DialogTrigger asChild>
				<Button>Create token</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form action={submit}>
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
				</form>
			</DialogContent>
		</Dialog>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[130px]">Name</TableHead>
					<TableHead className="w-[200px]">Last Used</TableHead>
					<TableHead>Id</TableHead>
					<TableHead className="w-[48px]" />
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows}
			</TableBody>
		</Table>
	</div >
}

function TokenSkeleton({ value }: { value?: string }): JSX.Element {
	return <TableRow className="cursor-not-allowed">
		{value ? <TableCell className="font-medium">{value}</TableCell> : <TableCell><Skeleton className="h-[21px] w-[full]" /></TableCell>}
		<TableCell><Skeleton className="h-[21px] w-[full]" /></TableCell>
		<TableCell><Skeleton className="h-[21px] w-[full]" /></TableCell>
		<TableCell />
	</TableRow>
}

function TokenRow({ token, remove }: { token: ClientToken, remove: () => void }): JSX.Element {
	const lastUsed = useMemo<string>(() => {
		if (token.last_used_at === null) return "Never";
		return new Date(token.last_used_at).toLocaleString();
	}, [token.last_used_at]);

	const { toast } = useToast();

	const copy = useCallback(() => {
		navigator.clipboard.writeText(token.id).then(() => {
			toast({
				description: "Copied token to clipboard",
			})
		}).catch(() => {
			toast({
				variant: "destructive",
				description: "Failed to copy token to clipboard"
			})
		})
	}, [toast, token.id]);

	const deleteToken = useCallback((ev: MouseEvent<HTMLButtonElement>) => {
		ev.stopPropagation();
		remove();
		fetcher({
			path: `/user/tokens/${token.id}`,
			method: "DELETE"
		})
	}, [token.id, remove]);

	return <TableRow onClick={copy} className="cursor-copy">
		<TableCell className="font-medium">{token.name}</TableCell>
		<TableCell>{lastUsed}</TableCell>
		<TableCell className="font-mono">{truncate(token.id, { length: 24 })}</TableCell>
		<div className="flex h-[52.5px] items-center justify-center">
			<Button className="m-0 cursor-pointer" onClick={deleteToken} variant='secondary'>
				<Trash className="h-4 w-4" />
			</Button>
		</div>
	</TableRow>
}