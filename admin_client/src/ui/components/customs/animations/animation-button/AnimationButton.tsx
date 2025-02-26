import type { CSSProperties, NamedExoticComponent } from "react";
import { memo } from "react";

import { Button, type ButtonProps } from "~/ui/components/base";
import AnimationWrapper from "../AnimationWrapper";

const AnimationButton: NamedExoticComponent<
  ButtonProps & {
    wrapperStyle?: CSSProperties;
  }
> = memo(({ disabled, wrapperStyle, ...props }) => {
  return (
    <AnimationWrapper noAnimation={disabled} style={{ display: "inline-block", ...wrapperStyle }}>
      <Button disabled={disabled} {...props} />
    </AnimationWrapper>
  );
});

export default AnimationButton;
