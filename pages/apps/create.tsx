import { useCallback, useState } from "react";
import { Field } from "#/components/field";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { Button } from "#/components/button";
import { IoAdd } from "react-icons/io5";
import { fetcher } from "#/lib/fetcher";
import { setCookie30Day } from "lib/cookie";
import { useRouter } from "next/router";
import { BasePage } from "#/components/base-page";
import styles from "#/styles/projects-create.module.css";
import { ApiResponseAppCreate } from "../api/app";

export default function ProjectsCreatePage() {

	const router = useRouter();
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = useCallback(() => {
		setLoading(true);
		fetcher<ApiResponseAppCreate>({
			path: "/app",
			method: "POST",
			body: { name }
		}).then(({ app }) => {
			setCookie30Day('appId', app.id);
			router.push("/dashboard");
		}).finally(() => {
			setLoading(false);
		})
	}, [name, router]);

	return <BasePage>
		<div className={styles.page}>
			<div className={styles.modal}>
				<h2>Create App</h2>
				<section>
					<h3>Name</h3>
					<Field
						disabled={loading}
						value={name}
						onChange={setName}
						placeholder='Name'
						icon={RxLetterCaseCapitalize}
					/>
				</section>
				<Button
					disabled={loading}
					icon={IoAdd}
					onClick={handleSubmit}
					value="Create App"
				/>
			</div>
		</div>
	</BasePage>
}