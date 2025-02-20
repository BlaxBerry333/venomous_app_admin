import type { NamedExoticComponent } from "react";
import { memo } from "react";

import IconOfLogoImage from "~/ui/assets/logo.webp";
import { Image, type ImageProps } from "~/ui/components";

const Logo: NamedExoticComponent<ImageProps> = memo((props) => {
  return <Image imageModule={IconOfLogoImage} {...props} />;
});

export default Logo;
