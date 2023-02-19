import { FormEventHandler, useCallback, useRef, useState } from "react";
import { Page } from "../page";
import styles from "./index.module.css";
import { cx } from "#/lib/front/cx";
import { FaHandSpock } from "react-icons/fa";
import { useAppData } from "../app-provider";
import { fetcher } from "#/lib/fetcher";

export function ContactPage() {

	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const typeRef = useRef<HTMLSelectElement>(null);
	const messageRef = useRef<HTMLTextAreaElement>(null);
	const [hide, setHide] = useState(false);
	const { id } = useAppData();

	const submit: FormEventHandler<HTMLFormElement> = useCallback((ev) => {
		ev.preventDefault();
		const name = nameRef.current?.value;
		const email = emailRef.current?.value;
		const type = typeRef.current?.value;
		const message = messageRef.current?.value;
		setHide(true);
		fetcher({
			path: `/contact`,
			method: "POST",
			body: {
				name,
				email,
				type,
				message,
				id
			}
		})
	}, [id])

	return <Page>
		<div className={styles.container}>
			<div className={styles.main}>
				<h1 className={styles.title}>Contact</h1>
				<form className={styles.form} onSubmit={submit}>
					<label htmlFor="name">Name:</label>
					<input ref={nameRef} type="text" autoCapitalize="words" autoComplete="name" id='name' name="name" placeholder="Name" />
					<label htmlFor="email">Email:</label>
					<input ref={emailRef} type="email" autoCapitalize="none" autoComplete="email" id='email' name='email' placeholder="Email" />
					<label htmlFor="type">Type: <span className={styles.req}>*</span></label>
					<select ref={typeRef} required id='type' name='type'>
						<option disabled value='' selected>Type</option>
						<option value='bug'>Bug Report</option>
						<option value='feature'>Feature Request</option>
						<option value='other'>Other</option>
					</select>
					<label htmlFor="message">Message: <span className={styles.req}>*</span></label>
					<textarea placeholder="Message" ref={messageRef} rows={4} required id='message' name='message' />
					<button type="submit">Send Message</button>
				</form>
			</div>
			<div className={cx(styles.thanks, hide && styles.showThanks)}>
				<FaHandSpock size={64} />
				<h2>Thank you for reaching out!</h2>
				<p>We have received your feedback and we will get back to you shortly. Have a nice day!</p>
			</div>
		</div>
	</Page >
}