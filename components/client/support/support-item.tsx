import styles from "./index.module.css";
import { FaChevronDown as Arrow } from "react-icons/fa";
import { cx } from "#/lib/front/cx";
import mdStyles from "../markdown-page/index.module.css";

export interface SupportItemProps {
	id: string,
	question: string,
	answer: string
}

export function SupportItem({
	item,
	isExpanded,
	setExpanded
}: {
	item: SupportItemProps;
	isExpanded: boolean;
	setExpanded: () => void;
}) {

	return <li className={styles.item}>
		<div className={cx(styles.top, isExpanded && styles.expanded)} onClick={setExpanded}>
			<h3 className={styles.question}>{item.question}</h3>
			<Arrow style={{ transform: `rotate(${isExpanded ? 180 : 0}deg)` }} className={styles.arrow} />
		</div>
		<div className={styles.bottom} style={{
			opacity: isExpanded ? 1 : 0,
			height: isExpanded ? "100%" : "0px"
		}}>
			<div className={cx(styles.answer, mdStyles.md, mdStyles.smd)} dangerouslySetInnerHTML={{ __html: item.answer }} />
		</div>
	</li>
}