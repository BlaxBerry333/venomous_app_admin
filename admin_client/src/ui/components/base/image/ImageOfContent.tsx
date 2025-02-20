import type { NamedExoticComponent } from "react";
import { memo } from "react";

import MuiStack from "@mui/material/Stack";

import IconContentOfData from "~/ui/assets/images/icons/content-of-data.png";
import { Image, type ImageProps } from "~/ui/components";

export enum ContentType {
  DATA = "data",
  FILE = "file",
  IMAGE = "image",
  VIDEO = "video",
  MUSIC = "music",
}

const IconOfContentType: Record<ContentType, string> = {
  [ContentType.DATA]: IconContentOfData,
  [ContentType.FILE]: IconContentOfData,
  [ContentType.IMAGE]: IconContentOfData,
  [ContentType.VIDEO]: IconContentOfData,
  [ContentType.MUSIC]: IconContentOfData,
};

const ImageOfContent: NamedExoticComponent<
  ImageProps & {
    contentType: ContentType;
  }
> = memo(({ contentType, ...props }) => {
  return (
    <MuiStack
      flexGrow={1}
      gap={2}
      sx={{ height: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Image imageModule={IconOfContentType[contentType]} width={100} {...props} />
    </MuiStack>
  );
});

export default ImageOfContent;
