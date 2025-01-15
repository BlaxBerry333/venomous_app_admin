import { Suspense } from "react";

import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import { ProgressBar } from "./common/components/custom/progress-bar";
import { Snackbar } from "./common/components/custom/snackbar";
import {
  CustomLocalizationProvider,
  CustomMuiThemeProvider,
  CustomQueryClientProvider,
} from "./common/components/providers";
import { Router as RouterViews } from "./common/router";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
          <CustomQueryClientProvider>
            <CustomLocalizationProvider>
              <CustomMuiThemeProvider>
                <Snackbar />
                <ProgressBar />
                <RouterViews />
              </CustomMuiThemeProvider>
            </CustomLocalizationProvider>
          </CustomQueryClientProvider>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
