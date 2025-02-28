import type { NamedExoticComponent } from "react";
import { memo } from "react";

import MuiStack, { type StackProps as MuiStackProps } from "@mui/material/Stack";

import { default as IconContentOfEmpty } from "~/ui/assets/images/icons/content-of-data.png";
import { Image, type ImageProps } from "~/ui/components";

type BlankContentImageProps = Omit<ImageProps, "imageModule"> & {
  wrapperSx?: MuiStackProps["sx"];
};

const BlankContentImage: NamedExoticComponent<BlankContentImageProps> = memo(
  ({ wrapperSx, ...props }) => {
    return (
      <MuiStack
        flexGrow={1}
        gap={2}
        sx={{ height: 1, justifyContent: "center", alignItems: "center", ...wrapperSx }}
      >
        <Image imageModule={IconContentOfEmpty} width={100} {...props} />
      </MuiStack>
    );
  },
);

export default BlankContentImage;
