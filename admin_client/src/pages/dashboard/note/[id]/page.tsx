import { Helmet } from "react-helmet-async";
import DashboardNoteDetailPageView from "./view";

export default function DashboardNoteDetailPage() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | Note Detail</title>
      </Helmet>

      <DashboardNoteDetailPageView />
    </>
  );
}
