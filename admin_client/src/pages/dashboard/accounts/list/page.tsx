import { Helmet } from "react-helmet-async";

import DashboardAccountListPageView from "./view";

export default function DashboardAccountListPage() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | Account List</title>
      </Helmet>

      <DashboardAccountListPageView />
    </>
  );
}
