import { Helmet } from "react-helmet-async";

import DashboardNoteListPageView from "./view";

export default function DashboardNoteListPage() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | Note List</title>
      </Helmet>

      <DashboardNoteListPageView />
    </>
  );
}
