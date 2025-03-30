import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Typography } from "~/ui/components";
import { IWorkflowDataType, type IWorkflowDataResponse } from "~/utils/libs/apis/types/_workflow";

const AVATAR_EMOJI: Record<IWorkflowDataType, string> = {
  [IWorkflowDataType.Logic]: "🧠",
  [IWorkflowDataType.Draft]: "🎃",
};

const DashboardWorkflowsListItemAvatar: NamedExoticComponent<{ item: IWorkflowDataResponse }> =
  memo(({ item }) => {
    return (
      <Typography
        variant="h4"
        sx={{
          width: "50px",
          height: "50px",
          textAlign: "center",
          lineHeight: "50px",
          borderRadius: "8px",
          backgroundColor: "action.hover",
          border: 1,
          borderColor: "action.hover",
          cursor: "default",
        }}
      >
        {AVATAR_EMOJI[item.type]}
      </Typography>
    );
  });

export default DashboardWorkflowsListItemAvatar;
