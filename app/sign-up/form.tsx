"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { useCallback } from "react"
import { useFetcher } from "@/lib/front/fetcher"
import { useRouter } from "next/navigation"
import { noop } from "lodash"

const signUpFormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters.",
		})
		.max(32, {
			message: "Name must not be longer than 32 characters.",
		}),
	email: z.string().email(),
	password: z.string().min(8, "Password must be at least 8 characters").max(256, "Password cannot be longer than 256 characters")
})

type AccountFormValues = z.infer<typeof signUpFormSchema>

export function SignUpForm() {
	const router = useRouter();
	const [fetcher, isLoading] = useFetcher();

	const form = useForm<AccountFormValues>({
		resolver: zodResolver(signUpFormSchema),
	})

	const onSubmit = useCallback((data: AccountFormValues) => {
		fetcher({
			path: "/user/sign-up",
			method: "POST",
			body: data
		}).then(() => {
			router.push("/dashboard");
		}).catch(noop);
	}, [fetcher, router]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input disabled={isLoading} placeholder="Your name" {...field} />
							</FormControl>
							<FormDescription>
								This is the name that will be displayed on your profile and in
								emails.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input disabled={isLoading} placeholder="Your email" {...field} />
							</FormControl>
							<FormDescription>
								This is the name that will be displayed on your profile and in
								emails.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input disabled={isLoading} type="password" placeholder="A strong password" {...field} />
							</FormControl>
							<FormDescription>
								This is the name that will be displayed on your profile and in
								emails.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isLoading} type="submit">Sign Up</Button>
			</form>
		</Form>
	)
}