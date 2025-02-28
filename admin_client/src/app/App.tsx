import { HelmetProvider } from "react-helmet-async";

import { LanguageProvider, RouterProvider } from "~/app/_providers";
import { ThemeProvider } from "~/ui/_providers";

export default function App() {
  return (
    <LanguageProvider>
      <HelmetProvider>
        <ThemeProvider>
          <RouterProvider>{/* RouteView */}</RouterProvider>
        </ThemeProvider>
      </HelmetProvider>
    </LanguageProvider>
  );
}
