import { Helmet } from "react-helmet-async";

import DashboardReportListPageView from "./view";

export default function DashboardReportListPage() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | Report List</title>
      </Helmet>

      <DashboardReportListPageView />
    </>
  );
}
