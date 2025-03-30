import type { CSSProperties, NamedExoticComponent } from "react";
import { memo } from "react";

import { Avatar, type AvatarProps } from "~/ui/components/base/avatar";
import AnimationWrapper from "./AnimationWrapper";

const AnimationAvatar: NamedExoticComponent<
  AvatarProps & {
    wrapperStyle?: CSSProperties;
  }
> = memo(({ wrapperStyle, ...props }) => {
  return (
    <AnimationWrapper style={{ display: "inline-block", cursor: "pointer", ...wrapperStyle }}>
      <Avatar {...props} />
    </AnimationWrapper>
  );
});

export default AnimationAvatar;
