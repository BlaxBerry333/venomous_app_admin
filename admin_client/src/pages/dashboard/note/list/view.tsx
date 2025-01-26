import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayoutMainContainerInnerWrappers from "~/common/components/layouts/DashboardLayout/DashboardLayoutMainContainerInnerWrappers";
import { ROUTE_PATHS } from "~/common/router";

export default function DashboardNoteListPageView() {
  const navigate = useNavigate();

  const navigateToEditor = useCallback((): void => {
    navigate(ROUTE_PATHS.dashboard.note.editor);
  }, [navigate]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <DashboardLayoutMainContainerInnerWrappers isOverflowHidden={false} showCommonFooter>
      <div>
        <button onClick={navigateToEditor}>Editor</button>
      </div>
      <div style={{ height: "300vh" }}>DashboardNoteListPageView</div>
    </DashboardLayoutMainContainerInnerWrappers>
  );
}
