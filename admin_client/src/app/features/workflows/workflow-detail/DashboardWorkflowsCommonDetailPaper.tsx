import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { Paper, type PaperProps } from "~/ui/components";

const DashboardWorkflowsCommonDetailPaper: NamedExoticComponent<PropsWithChildren<PaperProps>> =
  memo(({ children, ...props }) => {
    return (
      <Paper
        sx={{ height: "100%", py: 2, px: 4, overflowY: "scroll", backgroundImage: "none" }}
        titleSx={{ mt: 2 }}
        subTitleSx={{ mb: 4 }}
        {...props}
      >
        {children}
      </Paper>
    );
  });

export default DashboardWorkflowsCommonDetailPaper;
