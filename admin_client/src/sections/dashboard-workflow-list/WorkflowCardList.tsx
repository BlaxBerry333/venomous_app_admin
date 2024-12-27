import { memo, type NamedExoticComponent } from "react";

import { Icon } from "@iconify/react";
import MuiCard from "@mui/material/Card";
import MuiCardActions from "@mui/material/CardActions";
import MuiCardContent from "@mui/material/CardContent";
import MuiGrid from "@mui/material/Grid2";
import MuiTypography from "@mui/material/Typography";

import { CustomSquareBlock } from "~/common/components/custom/buttons";
import type { DRFWorkflowDataType } from "~/services/types/workflow";

const WorkflowCardList: NamedExoticComponent<{
  data: Array<DRFWorkflowDataType>;
  navigateToSpecificWorkflow: (id: number) => void;
}> = memo(({ data, navigateToSpecificWorkflow }) => {
  if (!data.length) {
    return null;
  }

  return (
    <MuiGrid container spacing={2}>
      {data?.map((item) => (
        <MuiGrid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
          <MuiCard
            sx={{
              height: 160,
              p: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <MuiCardContent>
              <MuiTypography>{item.name}</MuiTypography>
              <MuiTypography>{item.description}</MuiTypography>
            </MuiCardContent>
            <MuiCardActions sx={{ justifyContent: "flex-end" }}>
              <CustomSquareBlock size="small" color="primary">
                <Icon
                  icon="solar:routing-3-bold-duotone"
                  width={20}
                  onClick={() => navigateToSpecificWorkflow(item.id)}
                />
              </CustomSquareBlock>
            </MuiCardActions>
          </MuiCard>
        </MuiGrid>
      ))}
    </MuiGrid>
  );
});

export default WorkflowCardList;
