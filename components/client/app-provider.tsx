import { App, AppMeta } from "#/lib/types/app";
import { PropsWithChildren, createContext, useContext } from "react";

export interface AppProviderProps {
	meta: AppMeta;
	app: App;
}

const context = createContext<AppProviderProps>({} as AppProviderProps);

export function AppProvider(props: PropsWithChildren<AppProviderProps>) {
	return <context.Provider value={props}>
		<style jsx global>{`
			:root {
				--pri: ${props.app.theme ?? "#1e90ff"}
			}
		`}</style>
		{props.children}
	</context.Provider>
}

export function useApp(): AppProviderProps {
	return useContext(context);
}

export function useAppData(): App {
	return useContext(context).app;
}

export function useAppMeta(): AppMeta {
	return useContext(context).meta;
}