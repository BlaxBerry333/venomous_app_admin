import { ThemeProvider } from "~/ui/_providers";
import { LanguageProvider } from "~/utils/libs/i18n";
import { Router } from "~/utils/libs/router";

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </LanguageProvider>
  );
}
