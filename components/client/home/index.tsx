import { Page } from "../page";
import { Hero } from "../hero";
import { Stats } from "#/components/stat";

export function ClientPage(): JSX.Element {
	return <Page>
		<Hero />
		<Stats />
	</Page>
}