"use client";

import { useUser } from "@/lib/front/use-user";
import {
	LoginButton,
	LogoutButton,
} from "./buttons";

export default function Home() {

	const { status, user } = useUser();

	return (
		<main
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				height: "70vh",
				gap: 12
			}}
		>
			<div>
				<LoginButton />
				<LogoutButton />
			</div>
			<code>{status}</code>
			{user ? <>
				<img style={{ width: 100, height: 100 }} src={user.image} alt={user.name} />
				<p>{user.name}</p>
				<code>{user.id}</code>
				<p>{user.email}</p>
			</> : <span>loading...</span>}
		</main>
	);
}
