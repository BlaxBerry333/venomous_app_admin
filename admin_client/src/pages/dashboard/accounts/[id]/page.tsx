import { Helmet } from "react-helmet-async";

import DashboardAccountDetailPageView from "./view";

export default function DashboardAccountDetailPage() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | Account Detail</title>
      </Helmet>

      <DashboardAccountDetailPageView />
    </>
  );
}
