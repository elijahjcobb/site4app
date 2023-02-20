import { cx } from "#/lib/front/cx";
import { ReactNode } from "react";
import styles from "./index.module.css";

interface SkeletonProps {
	width?: number | string;
	height: number | string;
	noBorder?: boolean;
	noBackground?: boolean;
	className?: string;
}

export function Skeleton({
	width = '100%',
	height,
	noBorder = false,
	noBackground = false,
	className
}: SkeletonProps) {
	return <div
		style={{
			width,
			height
		}}
		className={cx(
			styles.skeleton,
			noBorder && styles.noBorder,
			noBackground && styles.noBackground,
			className
		)}
	>
		<div className={styles.outer}>
			<div className={styles.inner} />
		</div>
	</div>
}

export function SkeletonContainer({
	children,
	hasLoaded,
	width = "100%",
	height,
}: {
	children: ReactNode;
	hasLoaded: boolean;
	width?: number | string;
	height: number | string;
}) {
	return <div style={{
		width,
		height,
		position: 'relative'
	}}>
		<Skeleton width={width} height={height} />
		<div className={cx(styles.childrenContainer, hasLoaded && styles.hasLoaded)}>
			{children}
		</div>
	</div>
}