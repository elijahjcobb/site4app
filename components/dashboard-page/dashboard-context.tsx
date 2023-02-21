import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { useCallback } from "react";
import { fetcher } from "#/lib/front/fetcher";
import { useEffect } from "react";
import { useRef } from "react";
import { ApiResponseUser } from "#/pages/api/user";
import { ApiResponseAppWithMeta } from "#/pages/api/app/meta";
import { AppWithMeta } from "#/lib/api/fetchers";
import { User } from "#/lib/types/user";

interface DashboardContext {
	app: ApiResponseAppWithMeta | undefined;
	setApp: Dispatch<SetStateAction<ApiResponseAppWithMeta | undefined>>;
	user: ApiResponseUser | undefined;
	setUser: Dispatch<SetStateAction<ApiResponseUser | undefined>>;
	lastUpdated: number;
}

const context = createContext<DashboardContext>({} as DashboardContext);

async function fetchApp(): Promise<ApiResponseAppWithMeta> {
	return await fetcher<ApiResponseAppWithMeta>({
		path: "/app/meta",
		method: "GET",
		silent: true,
	})
}

async function fetchUser(): Promise<ApiResponseUser> {
	return await fetcher<ApiResponseUser>({
		path: "/user",
		method: "GET",
		silent: true,
	})
}

function fetchFromLocalStorage<T>(key: string): T | undefined {
	const value = localStorage.getItem(key);
	if (!value) return undefined;
	return JSON.parse(value) as T;
}

export function DashboardProvider({ children }: { children: ReactNode }) {

	const [user, setUser] = useState<ApiResponseUser | undefined>(undefined);
	const [app, setApp] = useState<ApiResponseAppWithMeta | undefined>(undefined);
	const [lastUpdated, setLastUpdated] = useState<number>(0);
	const interval = useRef<NodeJS.Timer | null>(null);

	useEffect(() => {
		setUser(fetchFromLocalStorage('user'));
		setApp(fetchFromLocalStorage('app'));
	}, []);

	const fetchScopes = useCallback(() => {
		(async () => {
			console.info("Sync Service: FETCH", new Date().toLocaleTimeString())
			const user = await fetchUser();
			const app = await fetchApp();
			setUser(user);
			setApp(app);
		})().catch(error => {
			console.error('Sync Service: ERROR - ', error);
		})
	}, []);

	useEffect(() => {
		const visibilityChanged = () => {
			const isVisible = document.visibilityState === 'visible';
			if (isVisible) fetchScopes();
			else if (interval.current) clearInterval(interval.current);
		}

		document.addEventListener('visibilitychange', visibilityChanged);
		return () => document.removeEventListener('visibilitychange', visibilityChanged);
	}, [fetchScopes]);

	const startInterval = useCallback(() => {
		console.info("Starting Sync Service", new Date().toLocaleTimeString())
		interval.current = setInterval(() => {
			fetchScopes();
		}, 10000);
	}, [fetchScopes]);

	const killInterval = useCallback(() => {
		console.info("Killing Sync Service", new Date().toLocaleTimeString())
		if (interval.current) clearInterval(interval.current);
	}, []);

	useEffect(() => {

		// fetch on load
		fetchScopes();

		// clear on load
		killInterval();

		// start interval 
		startInterval();

		// handle visibility change
		const visibilityChanged = () => {
			const isVisible = document.visibilityState === 'visible';
			if (isVisible) {
				startInterval();
			} else {
				killInterval();
			}
		}

		// add listener
		document.addEventListener('visibilitychange', visibilityChanged);

		return () => {
			killInterval();
			document.removeEventListener('visibilitychange', visibilityChanged);
		}
	}, [fetchScopes, startInterval, killInterval]);

	useEffect(() => {
		if (!user) return;
		console.info("Updating 'user' cache in localStorage.");
		localStorage.setItem('user', JSON.stringify(user))
	}, [user]);

	useEffect(() => {
		if (!app) return;
		console.info("Updating 'app' cache in localStorage.");
		localStorage.setItem('app', JSON.stringify(app))
	}, [app]);

	useEffect(() => {
		setLastUpdated(Date.now());
	}, [app, user])

	return <context.Provider value={{
		user,
		setUser,
		app,
		setApp,
		lastUpdated
	}}>
		{children}
	</context.Provider>
}

export function useDashboardContext() {
	return useContext(context);
}

export function useApp(): AppWithMeta | undefined {
	return useDashboardContext().app?.app;
}

export function useAppNoUpdate(): AppWithMeta | undefined {

	const [value, setValue] = useState<AppWithMeta | undefined>(undefined);
	const hasSet = useRef(false);
	const context = useDashboardContext();

	useEffect(() => {
		if (hasSet.current) return;
		const app = context.app?.app;
		if (!app) return;
		setValue(app);
		hasSet.current = true;
	}, [context]);

	return value;
}

export function useUser(): User | undefined {
	return useDashboardContext().user?.user;
}