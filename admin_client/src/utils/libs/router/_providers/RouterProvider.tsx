import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { BrowserRouter } from "react-router-dom";

import { PageProgressBar } from "~/ui/components";

const RouterProvider: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <BrowserRouter>
      <PageProgressBar />

      {children}
    </BrowserRouter>
  );
});

export default RouterProvider;
