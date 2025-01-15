import { Helmet } from "react-helmet-async";

import AuthSignUpPageView from "./view";

export default function AuthSignUpPage() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | SignUp</title>
      </Helmet>

      <AuthSignUpPageView />
    </>
  );
}
