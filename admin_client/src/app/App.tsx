import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import { LanguageProvider, ThemeProvider } from "../ui/_providers";
import { PageProgressBar } from "../ui/components";

export default function App() {
  return (
    <LanguageProvider>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <PageProgressBar />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </LanguageProvider>
  );
}
