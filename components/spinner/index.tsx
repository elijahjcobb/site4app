import { FaSpinner } from "react-icons/fa";
import styles from "./index.module.css";

export function Spinner({
	size = 32
}: {
	size?: number;
}): JSX.Element {
	return <FaSpinner style={{
		width: size, height: size
	}} className={styles.spinner} />
}