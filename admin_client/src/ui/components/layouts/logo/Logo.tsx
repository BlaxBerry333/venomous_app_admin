import type { NamedExoticComponent } from "react";
import { memo } from "react";

import IconOfLogoImage from "~/ui/assets/logo.webp";
import { Image, Link, type ImageProps } from "~/ui/components/base";

type LogoProps = Omit<ImageProps, "imageModule"> & {
  to: string;
};

const Logo: NamedExoticComponent<LogoProps> = memo(({ to, ...props }) => {
  return (
    <Link to={to} underline="none">
      <Image imageModule={IconOfLogoImage} {...props} />
    </Link>
  );
});

export default Logo;
