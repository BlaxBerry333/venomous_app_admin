import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

const _BlankFieldWrapper: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return <div style={{ height: 68 }}>{children}</div>;
});

export default _BlankFieldWrapper;
