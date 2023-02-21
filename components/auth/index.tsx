import { Icon } from "../icon";
import styles from "./index.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../button";
import { Field } from "../field";
import { ImSpinner } from "react-icons/im";
import { IoMail, IoLockClosed, IoPerson } from 'react-icons/io5';
import { cx } from "#/lib/front/cx";
import { fetcher } from "#/lib/front/fetcher";
import { ApiResponseUserSignIn } from "#/pages/api/user/sign-in";
import { useRouter } from "next/router";
import Link from "next/link";
import { setCookie30Day } from "lib/cookie";

function Feature({ title, subtitle }: { title: string, subtitle: string }) {
	return <div className={styles.feature}>
		<BsFillCheckCircleFill className={styles.featureCheck} />
		<div className={styles.featureText}>
			<span className={styles.featureTitle}>{title}</span>
			<span className={styles.featureSubtitle}>{subtitle}</span>
		</div>
	</div>
}

export function AuthPage({
	type: initialType
}: {
	type: "sign-up" | "sign-in"
}) {

	const router = useRouter();
	const [type, setType] = useState(initialType);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const handleOppositeClick = useCallback(() => {
		setType(type => {
			const newUrl = type === 'sign-in' ? "sign-up" : "sign-in"
			history.pushState({}, '', `/${newUrl}`);
			return newUrl;
		});
	}, []);


	const typeString = useMemo(() => {
		switch (type) {
			case 'sign-in':
				return "Sign In";
			case 'sign-up':
				return "Sign Up";
		}
	}, [type]);

	const typeCodeString = useMemo(() => {
		switch (type) {
			case 'sign-in':
				return "signIn()";
			case 'sign-up':
				return "signUp()";
		}
	}, [type]);

	const handlePrimaryClick = useCallback(() => {
		setLoading(true);

		let body: object;
		let url: string;

		if (type === 'sign-up') {
			body = { email, password, name }
			url = "/sign-up"
		} else {
			body = { email, password }
			url = "/sign-in"
		}

		fetcher<ApiResponseUserSignIn>({
			path: `/user${url}`,
			method: 'POST',
			body
		})
			.then(({ token }) => {
				if (token) setCookie30Day('authorization', token);
				router.push("/dashboard");
			}).finally(() => {
				setLoading(false);
			})

	}, [email, password, router, type, name]);

	return <div className={styles.container}>
		<div className={styles.left}>
			<Link href='/about' className={styles.header}>
				<Icon />
				<h1>site4app</h1>
			</Link>
			<div className={styles.features}>
				<Feature title="Collect form data from your static sites" subtitle="Quickly go from static to dynamic by sending your form data to snatch's servers." />
				<Feature title="View all responses in one place" subtitle="Check out snatch's dashboard to view all your form data across your sites with ZERO configuration." />
				<Feature title="Email notifications" subtitle="Configure notifications for both you and your form respondents when submissions are made." />
				<Feature title="Free to sign up" subtitle="No credit card to make an account and start collecting data." />
			</div>
		</div>
		<div className={styles.right}>
			<div className={styles.top}>
				<h2 className={styles.title}>{typeCodeString}</h2>
				<ImSpinner className={cx(styles.spinner, loading && styles.showSpinner)} />
			</div>
			<div className={styles.fields}>
				<Field
					placeholder="email"
					value={email}
					type='email'
					mono
					autoComplete='email'
					onChange={setEmail}
					disabled={loading}
					icon={IoMail}
				/>
				<Field
					placeholder="password"
					value={password}
					type='password'
					mono
					disabled={loading}
					autoComplete={type === 'sign-up' ? 'new-password' : 'current-password'}
					onChange={setPassword}
					icon={IoLockClosed}
				/>
				{type === 'sign-up' ? <Field
					placeholder="First Last"
					value={name}
					type='text'
					autoComplete='name'
					onChange={setName}
					disabled={loading}
					icon={IoPerson}
				/> : null}
				<div className={styles.buttons}>
					<Button
						onClick={handleOppositeClick}
						disabled={loading}
						value={type === 'sign-in' ? "Sign Up" : "Sign In"}
						secondary />
					<Button
						onClick={handlePrimaryClick}
						disabled={loading}
						value={typeString} />
				</div>
			</div>
		</div>
	</div>
}