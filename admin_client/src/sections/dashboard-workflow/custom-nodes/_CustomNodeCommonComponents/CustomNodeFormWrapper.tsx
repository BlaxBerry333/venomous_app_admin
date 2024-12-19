import type { NamedExoticComponent, PropsWithChildren } from "react";

import MuiBox from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import MuiDivider from "@mui/material/Divider";
import MuiStack from "@mui/material/Stack";
import { memo } from "react";
import type { CustomNodeWrapperProps } from "~/common/types/dashboard-workflow";
import type { FunctionParamsArrayOf } from "~/common/types/tools";

type RenderNodeFormComponentParamsType = FunctionParamsArrayOf<
  Exclude<CustomNodeWrapperProps["renderNodeFormComponent"], false>
>[0];

const CustomNodeFormWrapper: NamedExoticComponent<
  PropsWithChildren<{ handleOnFormSubmit: RenderNodeFormComponentParamsType["handleFormSubmit"] }>
> = memo(({ children, handleOnFormSubmit }) => {
  return (
    <MuiBox
      component="form"
      style={{
        height: "-webkit-fill-available",
        display: "flex",
        flexDirection: "column-reverse",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleOnFormSubmit(e.currentTarget.value);
      }}
    >
      <MuiStack
        spacing={1}
        sx={{
          position: "sticky",
          float: "inline-end",
          display: "flex",
          justifyContent: "flex-end",
          bottom: 0,
        }}
      >
        <MuiButton type="submit" color="primary">
          {"Save"}
        </MuiButton>
      </MuiStack>

      <MuiBox
        sx={{
          height: "-webkit-fill-available",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MuiBox sx={{ flex: 1 }}>{children}</MuiBox>

        <MuiDivider />
      </MuiBox>
    </MuiBox>
  );
});

export default CustomNodeFormWrapper;
