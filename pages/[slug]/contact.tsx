import { AppProvider, AppProviderProps } from "#/components/client/app-provider";
import { ContactPage } from "#/components/client/contact";
import { clientGetStaticPathsWithFilter, clientGetStaticPropsWithFilter } from "#/lib/api/client-props";

export default function Page(props: AppProviderProps) {
	return <AppProvider app={props.app} meta={props.meta}>
		<ContactPage />
	</AppProvider>
}

export const getStaticPaths = clientGetStaticPathsWithFilter("enable_contact");
export const getStaticProps = clientGetStaticPropsWithFilter("enable_contact");