import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PortalProps = PropsWithChildren<{
  targetElementID: string;
}>;

const Portal: NamedExoticComponent<PortalProps> = memo(({ children, targetElementID }) => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById(targetElementID);
    setTargetElement(element);
  }, [targetElementID]);

  // ----------------------------------------------------------------------------------------------------

  if (!targetElement) {
    return null;
  }

  return createPortal(<>{children}</>, targetElement, targetElementID);
});

export default Portal;
