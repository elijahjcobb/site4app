import { DashboardHome } from "#/components/dashboard-home";
import { DashboardPage } from "#/components/dashboard-page";


export default function Page() {
	return <DashboardPage useMaxWidth title="dashboard">
		<DashboardHome />
	</DashboardPage>
}