import { ErrorCode } from "~/ui/components";
import { PageContent } from "~/ui/components/layouts";
import { ErrorLayout } from "~/ui/templates";

export default function Error403Page() {
  return (
    <PageContent helmet={{ title: "403" }}>
      <ErrorLayout
        errorCode={ErrorCode.FORBIDDEN}
        title="Forbidden"
        subtitle="You do not have permission to access this page"
        hideNavigationButton
      />
    </PageContent>
  );
}
