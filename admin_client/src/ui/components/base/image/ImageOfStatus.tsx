import type { NamedExoticComponent } from "react";
import { memo } from "react";

import IconOfLogoImage from "~/ui/assets/logo.webp";
import { Image, type ImageProps } from "~/ui/components";

export enum StatusCode {
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

const IconOfStatusCode: Record<StatusCode, string> = {
  [StatusCode.NOT_FOUND]: IconOfLogoImage,
  [StatusCode.FORBIDDEN]: IconOfLogoImage,
  [StatusCode.UNAUTHORIZED]: IconOfLogoImage,
  [StatusCode.SERVER_ERROR]: IconOfLogoImage,
};

const ImageOfStatus: NamedExoticComponent<
  ImageProps & {
    statusCode: StatusCode;
  }
> = memo(({ statusCode, ...props }) => {
  return <Image imageModule={IconOfStatusCode[statusCode]} {...props} />;
});

export default ImageOfStatus;
