import { memo, type NamedExoticComponent, type PropsWithChildren } from "react";

import { RouterProvider } from "./_providers";
import { RouterViews } from "./_routes";

const Router: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <RouterProvider>
      <RouterViews />
      {children}
    </RouterProvider>
  );
});

export default Router;
