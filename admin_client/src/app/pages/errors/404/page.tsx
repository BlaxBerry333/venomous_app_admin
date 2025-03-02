import { ErrorCode } from "~/ui/components";
import { PageContent } from "~/ui/components/layouts";
import { ErrorLayout } from "~/ui/templates";

export default function Error404Page() {
  return (
    <PageContent helmet={{ title: "404" }}>
      <ErrorLayout errorCode={ErrorCode.NOT_FOUND} />
    </PageContent>
  );
}
