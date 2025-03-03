import { ThemeProvider } from "~/ui/_providers";
import { QueryClientProvider } from "~/utils/libs/apis";
import { LanguageProvider } from "~/utils/libs/i18n";
import { Router } from "~/utils/libs/router";

export default function App() {
  return (
    <QueryClientProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
