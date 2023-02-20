import { DashboardPage } from "#/components/dashboard-page";
import { SettingsAppDelete } from "#/components/settings/app/delete";
import { SettingsAppName } from "#/components/settings/app/name";
import { SettingsAppPlan } from "#/components/settings/app/plan";
import { SettingsAppSlug } from "#/components/settings/app/slug";
import { SettingsAppPages } from "#/components/settings/app/pages";
import { SettingsUserName } from "#/components/settings/user/name";


export default function Page() {
	return <DashboardPage useMaxWidth title='settings'>
		<ProjectSettings />
		<UserSettings />
	</DashboardPage>
}

function UserSettings() {
	return <>
		<h2>User Settings</h2>
		<SettingsUserName />
	</>
}

function ProjectSettings() {
	return <>
		<h2>App Settings</h2>
		<SettingsAppName />
		<SettingsAppSlug />
		<SettingsAppPages />
		<SettingsAppPlan />
		<SettingsAppDelete />
	</>
}