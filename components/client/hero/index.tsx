import Image from "next/image";
import { useAppData, useAppMeta } from "../app-provider";
import styles from "./index.module.css";

export function Hero() {

	const { screenshots } = useAppMeta();
	const { name } = useAppData();

	return <section className={styles.hero}>
		<div className={styles.screenshots}>
			{screenshots.map(screenshot => {
				return <Image className={styles.screenshot} alt={`${name} screenshot`} src={screenshot} key={screenshot} width={261} height={464} />
			})}
		</div>
	</section>
}