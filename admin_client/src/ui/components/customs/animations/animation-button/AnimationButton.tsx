import type { CSSProperties, NamedExoticComponent } from "react";
import { memo } from "react";

import { Button, type ButtonProps } from "~/ui/components/base";
import AnimationWrapper from "../AnimationWrapper";

const AnimationButton: NamedExoticComponent<
  ButtonProps & {
    wrapperStyle?: CSSProperties;
  }
> = memo(({ wrapperStyle, ...props }) => {
  return (
    <AnimationWrapper style={{ display: "inline-block", ...wrapperStyle }}>
      <Button {...props} />
    </AnimationWrapper>
  );
});

export default AnimationButton;
