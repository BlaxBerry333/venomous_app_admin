import type { CSSProperties, NamedExoticComponent } from "react";
import { memo } from "react";

import { IconButton, type IconButtonProps } from "~/ui/components/base/iconbutton";
import AnimationWrapper from "../AnimationWrapper";

const AnimationIconButton: NamedExoticComponent<
  IconButtonProps & {
    wrapperStyle?: CSSProperties;
  }
> = memo(({ disabled, wrapperStyle, ...props }) => {
  return (
    <AnimationWrapper noAnimation={disabled} style={{ display: "inline-block", ...wrapperStyle }}>
      <IconButton disabled={disabled} {...props} />
    </AnimationWrapper>
  );
});

export default AnimationIconButton;
