import Image from "next/image";
import { useApp } from "../app-provider";
import styles from "./index.module.css";

export function Hero() {

	const { screenshots, name } = useApp();

	return <section className={styles.hero}>
		<div className={styles.screenshots}>
			{screenshots.map(screenshot => {
				return <Image className={styles.screenshot} alt={`${name} screenshot`} src={screenshot} key={screenshot} width={261} height={464} />
			})}
		</div>
	</section>
}