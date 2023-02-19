import type { IconType } from "react-icons/lib";
import styles from "./index.module.css";
import { cx } from "#/lib/front/cx";
import { ButtonHTMLAttributes, ClassAttributes, useMemo } from "react";
import Link from "next/link";

function GenericButton(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement>) {
	return <button {...props} />
}

export function Button({
	value,
	icon: Icon,
	onClick,
	disabled,
	secondary = false,
	href,
	newTab = false,
	className,
	destructive = false,
	gradient = false
}: {
	value?: string;
	icon?: IconType;
	secondary?: boolean;
	onClick?: () => void;
	disabled?: boolean;
	href?: string;
	newTab?: boolean;
	className?: string;
	destructive?: boolean;
	gradient?: boolean;
}) {

	const Comp = useMemo(() => href ? Link : GenericButton, [href]);

	return <Comp
		// @ts-expect-error - Ignore type error.
		href={href}
		target={newTab ? '_blank' : '_self'}
		disabled={disabled}
		onClick={onClick}
		className={cx(
			styles.button,
			secondary ? styles.secondary : styles.primary,
			destructive && styles.destructive, className,
			gradient && styles.gradient
		)}>
		{Icon ? <Icon className={styles.icon} /> : null}
		{value ? <span>{value}</span> : null}
	</Comp>
}