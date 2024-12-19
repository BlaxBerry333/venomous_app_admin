import { Helmet } from "react-helmet-async";

import AuthLoginPageView from "./view";

export default function AuthLoginPage() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | Login</title>
      </Helmet>

      <AuthLoginPageView />
    </>
  );
}
