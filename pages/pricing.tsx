import { cx } from "#/lib/front/cx";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoCheckmark, IoInformationCircle } from "react-icons/io5";
import { Button } from "#/components/button";
import { MarketingPage } from "#/components/marketing-page";
import styles from "#/styles/pricing.module.css";

type AccountType = 'free' | 'pro';
type LineItems = Record<string, {
	plans: Record<AccountType, { value?: string, description?: string, enabled: boolean }>,
	description: string
}>

const LINE_ITEMS: LineItems = {
	'Landing Page': {
		plans: {
			free: { enabled: true, },
			pro: { enabled: true },
		},
		description: "Automatically generates a landing page using screenshots, description, rating, and more."
	},
	'Sync with App Store ©': {
		plans: {
			free: { enabled: true, },
			pro: { enabled: true },
		},
		description: "Automatically grab your app's metadata from the App Store © page."
	},
	'AI Generation': {
		plans: {
			free: { enabled: true, },
			pro: { enabled: true },
		},
		description: "Use AI to generate the content on your app's website."
	},
	'OG Metadata': {
		plans: {
			free: { enabled: true, },
			pro: { enabled: true },
		},
		description: "Automatically generate smart links when your user's share your website."
	},
	'Dark Mode': {
		plans: {
			free: { enabled: true, },
			pro: { enabled: true },
		},
		description: "Your website will definitely support dark mode."
	},
	'Mobile Friendly': {
		plans: {
			free: { enabled: true, },
			pro: { enabled: true },
		},
		description: "Don't worry, your website will definitely be mobile ready!"
	},
	'Privacy Policy Page': {
		plans: {
			free: { enabled: true },
			pro: { enabled: true },
		},
		description: "Create a privacy policy page with markdown."
	},
	'Terms and Conditions Page': {
		plans: {
			free: { enabled: true },
			pro: { enabled: true },
		},
		description: "Create a terms and conditions page with markdown."
	},
	'Support Page': {
		plans: {
			free: { enabled: false },
			pro: { enabled: true },
		},
		description: "Create a support page with Q&A's."
	},
	'Contact Page': {
		plans: {
			free: { enabled: false },
			pro: { enabled: true },
		},
		description: "Create a contact page. Receive emails when users contact you."
	},
	'Custom Theme': {
		plans: {
			free: { enabled: false },
			pro: { enabled: true },
		},
		description: "Set a custom color for your site."
	},
	'Domain': {
		plans: {
			free: { enabled: false },
			pro: { enabled: true },
		},
		description: "Use a custom domain name. Coming soon..."
	},
}

function CheckMarkSubtitle({ value }: { value: string }) {
	return <div className={styles.checkMarkSubtitle}>
		<IoCheckmark />
		<span>{value}</span>
	</div>
}

export default function Page() {
	return <MarketingPage title="pricing">
		<div className={styles.container}>
			<h1 className={styles.title}>You build the app,<br />we build your site.</h1>
			<div className={styles.subtitleContainer}>
				<CheckMarkSubtitle value="Landing Page" />
				<CheckMarkSubtitle value="Automagically Grab Metadata" />
				<CheckMarkSubtitle value="Generate website copy with AI" />
			</div>
			<div className={styles.pricingCards}>
				<PricingCard
					name="Hobby"
					price={0}
					priceDescription='free, plain and simple'
					isSecondaryButton={false}
					href='/sign-up'
					buttonValue="Sign Up"
					type='free'
				/>
				<PricingCard
					name="Pro"
					price={5}
					priceDescription='per month'
					isSecondaryButton={false}
					href='/sign-up'
					buttonValue="Sign Up"
					type="pro"
				/>
			</div>
		</div>
	</MarketingPage>
}

interface LineItem {
	value: string,
	enabled: boolean,
	description: string
}

function PricingCardLineItem({
	value,
	enabled,
	description
}: LineItem) {

	const [pos, setPos] = useState<[number, number]>([0, 0]);
	const [showTooltip, setShowTooltip] = useState(false);
	const parent = useRef<HTMLDivElement>(null);
	const tooltip = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!parent.current) return;
		if (!tooltip.current) return;
		const x = parent.current.offsetLeft;
		let y = parent.current.offsetTop;
		y -= tooltip.current.clientHeight + 8;
		setPos([x, y]);
	}, []);

	return <div ref={parent} className={cx(styles.lineItem, !enabled && styles.na)}>
		<span>{value}</span>
		<IoInformationCircle
			onClick={() => setShowTooltip(true)}
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
			className={styles.info} />
		<span
			ref={tooltip}
			style={{ left: pos[0], top: pos[1] }}
			onClick={() => setShowTooltip(false)}
			className={cx(styles.tooltip, showTooltip && styles.showTooltip)}
		>{description}</span>
	</div>
}


function PricingCard({
	price,
	priceDescription,
	name,
	isSecondaryButton,
	href,
	buttonValue,
	type
}: {
	price: number;
	priceDescription: string;
	name: string;
	isSecondaryButton: boolean;
	href: string;
	buttonValue: string;
	type: AccountType;
}) {

	const items = useMemo<LineItem[]>(() => {
		const i: LineItem[] = [];
		for (const [featureName, feature] of Object.entries(LINE_ITEMS)) {
			const plan = feature.plans[type];
			const value = plan.value ?? featureName;
			const enabled = plan.enabled;
			const description = plan.description ?? feature.description;
			i.push({ value, enabled, description });
		}
		return i;
	}, [type]);

	return <div className={styles.pricingCard}>
		<span className={styles.name}>{name}</span>
		<span className={styles.price}>{`$${price}`}</span>
		<span className={styles.priceDescription}>{priceDescription}</span>
		<Button
			value={buttonValue}
			href={href}
			className={styles.cta}
			secondary={isSecondaryButton}
		/>
		<div className={styles.line} />
		<div className={styles.items}>
			{items.map(v => <PricingCardLineItem key={v.value} {...v} />)}
		</div>
	</div>
}