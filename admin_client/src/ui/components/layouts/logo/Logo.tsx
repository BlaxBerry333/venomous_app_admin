import type { NamedExoticComponent } from "react";
import { memo } from "react";

import IconOfLogoImage from "~/ui/assets/logo.webp";
import { Image, Link, type ImageProps } from "~/ui/components/base";

const Logo: NamedExoticComponent<ImageProps> = memo((props) => {
  return (
    <Link to="/" underline="none">
      <Image imageModule={IconOfLogoImage} {...props} />
    </Link>
  );
});

export default Logo;
