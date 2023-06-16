"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {

	const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL
	const callbackUrl = vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"

	return (
		<button style={{ marginRight: 10 }} onClick={() => signIn('github', { callbackUrl })}>
			Sign in
		</button>
	);
};

export const RegisterButton = () => {
	return (
		<Link href="/register" style={{ marginRight: 10 }}>
			Register
		</Link>
	);
};

export const LogoutButton = () => {
	return (
		<button style={{ marginRight: 10 }} onClick={() => signOut()}>
			Sign Out
		</button>
	);
};

export const ProfileButton = () => {
	return <Link href="/profile">Profile</Link>;
};
