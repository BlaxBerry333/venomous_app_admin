import { Helmet } from "react-helmet-async";

export default function Error500Page() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | 500</title>
      </Helmet>

      <div>500</div>
    </>
  );
}
