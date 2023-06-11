import { useMemo } from "react";
import { useAppMeta } from "@/components/client/app-provider"
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import styles from "./index.module.css";

export function Stars(): JSX.Element {

	const { rating } = useAppMeta();


	const wholeStarsCount = useMemo(() => {
		return ~~rating
	}, [rating]);

	const showHalfStar = useMemo(() => {
		return (rating - wholeStarsCount) > 0.5
	}, [rating, wholeStarsCount]);

	const emptyStarsCount = useMemo(() => {
		return 5 - wholeStarsCount - (showHalfStar ? 1 : 0)
	}, [wholeStarsCount, showHalfStar]);

	const wholeStars = useMemo(() => {
		return new Array(wholeStarsCount).fill("").map((_, i) => <FaStar key={i} />)
	}, [wholeStarsCount]);

	const emptyStars = useMemo(() => {
		return new Array(emptyStarsCount).fill("").map((_, i) => <FaRegStar key={i} />)
	}, [emptyStarsCount]);

	return <div className={styles.stars}>
		{wholeStars}
		{showHalfStar ? <FaStarHalfAlt /> : null}
		{emptyStars}
		<span>{rating.toPrecision(2)}</span>
	</div>
}


export function Stats(): JSX.Element {

	const { description } = useAppMeta();

	const paragraphs = useMemo(() => {
		return description.split("\n").map(p => <p key={p}>{p.length === 0 ? <br /> : p}</p>)
	}, [description])

	return <div className={styles.container}>
		<Stars />
		<h2>Description</h2>
		{paragraphs}
	</div>
}