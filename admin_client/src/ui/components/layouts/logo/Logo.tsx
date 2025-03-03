import type { NamedExoticComponent } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";

import IconOfLogoImage from "~/ui/assets/logo.webp";
import { Image, type ImageProps } from "~/ui/components/base";

const Logo: NamedExoticComponent<ImageProps> = memo((props) => {
  return (
    <Link to="/">
      <Image imageModule={IconOfLogoImage} {...props} />
    </Link>
  );
});

export default Logo;
