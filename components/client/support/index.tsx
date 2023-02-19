import { useState } from "react";
import { Page } from "../page";
import { SupportItem, SupportItemProps } from "./support-item";
import styles from "./index.module.css";
import { useAppData } from "../app-provider";
import { Callout } from "../callout";

export interface SupportPageProps {
	items: SupportItemProps[];
}

export function SupportPage({
	items
}: SupportPageProps) {

	const [expandedItem, setExpandedItem] = useState<string | undefined>();
	const { slug } = useAppData();

	return <Page>
		<h1>Support</h1>
		<ul className={styles.list}>
			{items.map(item => <SupportItem
				key={item.id}
				isExpanded={expandedItem === item.id}
				setExpanded={() => {
					setExpandedItem(v => {
						if (v === item.id) return undefined;
						else return item.id;
					});
				}}
				item={item} />)}
		</ul>
		<Callout />
	</Page>
}