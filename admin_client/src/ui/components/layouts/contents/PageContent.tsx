import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { Helmet, HelmetProvider } from "react-helmet-async";

type PageContentProps = PropsWithChildren<{
  helmet?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}>;

const PageContent: NamedExoticComponent<PageContentProps> = memo(({ children, helmet }) => {
  return (
    <HelmetProvider>
      <Helmet>
        {helmet?.title && <title>{helmet.title}</title>}
        {helmet?.description && <meta name="description" content={helmet.description} />}
        {helmet?.keywords && <meta name="keywords" content={helmet.keywords} />}
      </Helmet>

      {children}
    </HelmetProvider>
  );
});

export default PageContent;
