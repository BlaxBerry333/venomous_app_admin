import { Helmet } from "react-helmet-async";
import DashboardNoteEditorPageView from "./view";

export default function DashboardNoteEditorPage() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | Note Editor</title>
      </Helmet>

      <DashboardNoteEditorPageView />
    </>
  );
}
