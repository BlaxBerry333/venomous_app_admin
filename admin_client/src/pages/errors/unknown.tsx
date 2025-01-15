import { Helmet } from "react-helmet-async";

export default function Error500Page() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | Unknown Error</title>
      </Helmet>

      <div>Unknown Error</div>
    </>
  );
}
