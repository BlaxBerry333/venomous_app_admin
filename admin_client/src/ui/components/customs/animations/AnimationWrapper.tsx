import type { CSSProperties, NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { LazyMotion, domAnimation } from "motion/react";
import * as m from "motion/react-m";

const AnimationWrapper: NamedExoticComponent<
  PropsWithChildren<{ style?: CSSProperties; noAnimation?: boolean }>
> = memo(({ children, style, noAnimation }) => {
  return (
    <div style={style}>
      <LazyMotion features={domAnimation}>
        <m.div
          whileHover={{ scale: noAnimation ? 1 : 1.1 }}
          whileTap={{ scale: noAnimation ? 1 : 0.9 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </m.div>
      </LazyMotion>
    </div>
  );
});

export default AnimationWrapper;
