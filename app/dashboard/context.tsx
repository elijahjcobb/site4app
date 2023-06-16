"use client";

import { AppWithMeta } from "@/db";
import { ClientUser } from "@/lib/pick";
import { createContext, useContext } from "react";

export interface DashboardContextProps {
	app: AppWithMeta;
	user: ClientUser;
}

export interface DashboardContextContext extends DashboardContextProps {

}

const context = createContext<DashboardContextContext>({} as DashboardContextContext);

export function DashboardContext({ children, app, user }: { children: JSX.Element | JSX.Element[] } & DashboardContextProps): JSX.Element {
	return <context.Provider value={{ app, user }}>
		{children}
	</context.Provider>
}

export function useDashboardContext(): DashboardContextContext {
	return useContext(context);
}