import { Suspense } from "react";

import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import {
  CustomLocalizationProvider,
  CustomMuiThemeProvider,
  CustomQueryClientProvider,
} from "./common/components/providers";
import { Router as RouterViews } from "./router";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
          <CustomQueryClientProvider>
            <CustomLocalizationProvider>
              <CustomMuiThemeProvider>
                <RouterViews />
              </CustomMuiThemeProvider>
            </CustomLocalizationProvider>
          </CustomQueryClientProvider>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
