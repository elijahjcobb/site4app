import { cx } from "#/lib/front/cx";
import { Button } from "#/components/button";
import { MarketingPage } from "#/components/marketing-page";
import styles from "#/styles/about-page.module.css";
import { RxChevronDown } from "react-icons/rx";
import Image from "next/image";

export default function Page() {
	return <MarketingPage title="about">
		<div className={styles.page}>
			<div className={styles.heroContainer}>
				<div className={styles.blobContainer}>
					<div className={cx(styles.blob, styles.leftBlob)} />
					<div className={cx(styles.blob, styles.rightBlob)} />
				</div>
				<div className={styles.hero}>
					<div className={styles.heroHeader}>
						<h1>Generate a website for your App with AI</h1>
						<h1 className={styles.colorfulHeader}>site4app</h1>
					</div>
					<div className={cx(styles.hFlex, styles.heroCTA)}>
						<Button gradient href='/sign-up' value="Sign Up" />
						<Button href='/pricing' secondary value="Pricing" />
					</div>
				</div>
				<a href="#sec1" className={styles.arrow}>
					<RxChevronDown />
				</a>
			</div>
			<section id='sec1'>
				<Image src='https://via.placeholder.com/480x320.png' width={480} height={320} alt='placeholder' />
				<div>
					<h2>This is a Header</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>
			</section>
			<div className={styles.dark}>
				<section>
					<Image src='https://via.placeholder.com/480x320.png' width={480} height={320} alt='placeholder' />
					<div>
						<h2>This is a Header</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</div>
				</section>
			</div>
			<section>
				<Image src='https://via.placeholder.com/480x320.png' width={480} height={320} alt='placeholder' />
				<div>
					<h2>This is a Header</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>
			</section>
			<div className={styles.dark}>
				<section>
					<Image src='https://via.placeholder.com/480x320.png' width={480} height={320} alt='placeholder' />
					<div>
						<h2>This is a Header</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</div>
				</section>
			</div>
			<section>
				<Image src='https://via.placeholder.com/480x320.png' width={480} height={320} alt='placeholder' />
				<div>
					<h2>This is a Header</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>
			</section>
		</div>
	</MarketingPage>
}