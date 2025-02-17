import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Image, type ImageProps } from "~/ui/components";

import IconOfLogoImage from "~/assets/logo.webp";

const Logo: NamedExoticComponent<ImageProps> = memo((props) => {
  return <Image imageModule={IconOfLogoImage} {...props} />;
});

export default Logo;
