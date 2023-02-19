import { AppProvider, AppProviderProps } from "#/components/client/app-provider";
import { ClientPage } from "#/components/client/home";
import { clientGetStaticPaths, clientGetStaticProps } from "#/lib/api/client-props";

export default function Page(props: AppProviderProps) {
	return <AppProvider app={props.app}>
		<ClientPage />
	</AppProvider>
}

export const getStaticPaths = clientGetStaticPaths;
export const getStaticProps = clientGetStaticProps;