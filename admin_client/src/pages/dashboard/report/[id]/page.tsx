import { Helmet } from "react-helmet-async";
import DashboardReportDetailPageView from "./view";

export default function DashboardReportDetailPage() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | Report Detail</title>
      </Helmet>

      <DashboardReportDetailPageView />
    </>
  );
}
