import { Button } from "#/components/button";
import { useUser } from "#/components/dashboard-page/dashboard-context";
import { Field } from "#/components/field";
import { SkeletonContainer } from "#/components/skeleton";
import { fetcher } from "#/lib/front/fetcher";
import { ApiResponseUser } from "#/pages/api/user";
import { useState, useEffect, useCallback } from "react";
import { IoPerson } from "react-icons/io5";
import styles from "../index.module.css";

export function SettingsUserName() {

	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');

	const user = useUser();

	useEffect(() => {
		if (user) setName(user.name);
	}, [user]);

	const handleUpdate = useCallback(() => {
		setLoading(true);
		fetcher<ApiResponseUser>({
			path: "/user",
			method: "PUT",
			body: { name }
		}).then(res => {
			setName(res.user.name);
		})
			.finally(() => setLoading(false))
	}, [name]);

	return <section>
		<h3>Name</h3>
		<p>Change your name.</p>
		<div className={styles.flex}>
			<SkeletonContainer hasLoaded={Boolean(user)} height={42}>
				<Field
					disabled={loading}
					value={name}
					icon={IoPerson}
					onChange={setName}
					placeholder='Name'
				/>
			</SkeletonContainer>
			<Button
				onClick={handleUpdate}
				disabled={loading || !user}
				value="Update"
			/>
		</div>
	</section>
}