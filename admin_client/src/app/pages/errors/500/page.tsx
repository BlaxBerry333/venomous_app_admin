import { ErrorCode } from "~/ui/components";
import { PageContent } from "~/ui/components/layouts";
import { ErrorLayout } from "~/ui/templates";

export default function Error500Page() {
  return (
    <PageContent helmet={{ title: "500" }}>
      <ErrorLayout errorCode={ErrorCode.SERVER_ERROR} />
    </PageContent>
  );
}
