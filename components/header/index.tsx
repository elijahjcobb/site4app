import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../button';
import { Icon } from '../icon';
import styles from './index.module.css';
import { isSignedIn } from '#/lib/front/is-signed-in';

function HeaderLink({
	href,
	value,
	newTab = false
}: {
	href: string;
	value: string;
	newTab?: boolean;
}) {
	return <Link target={newTab ? '_blank' : '_self'} className={styles.link} href={href} >
		{value}
	</Link >
}

export function Header() {

	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {
		setSignedIn(isSignedIn());
	}, []);

	return <header className={styles.header}>
		<Link href='/' className={styles.title}>
			<Icon size={32} />
			<h1>site4app</h1>
		</Link>
		<nav className={styles.nav}>
			<div className={styles.links}>
				<HeaderLink href='/' value='home' />
				<HeaderLink href='/pricing' value='pricing' />
				<HeaderLink href='/docs' value='docs' />
			</div>
			<div className={styles.buttons}>
				{signedIn
					? <Button href='/dashboard' value='Dashboard' />
					: (<>
						<Button href='/sign-in' value='Sign In' secondary />
						<Button href='/sign-up' value='Sign Up' />
					</>)}
			</div>
		</nav>
	</header >
}