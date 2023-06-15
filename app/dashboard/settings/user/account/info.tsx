"use client";

import { ReadOnlyEntity } from "@/components/client/read-only-entity";
import { useUser } from "@/lib/front/use-user";

export function AccountInfo(): JSX.Element {

	const { user } = useUser();

	return <>
		<ReadOnlyEntity title='Name' description="The name that will be displayed on your profile and in emails." value={user?.name} />
		<ReadOnlyEntity title='Email' description="The email associated with your account." value={user?.email} />
		<ReadOnlyEntity title='User ID' description="The identifier for your account." mono value={user?.id} />
	</>
}