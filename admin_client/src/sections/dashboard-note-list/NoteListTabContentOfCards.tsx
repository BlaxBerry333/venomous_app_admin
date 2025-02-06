import type { NamedExoticComponent } from "react";
import { memo, useMemo } from "react";

import { Icon } from "@iconify/react";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid2";
import MuiTypography from "@mui/material/Typography";

import { CardWithPulldownMenuList } from "~/common/components/custom/cards";
import { CustomLoadingScreen } from "~/common/components/custom/loadings";
import useTranslation from "~/common/hooks/useTranslation";
import { formatDate } from "~/common/utils/handle-date-formatters";
import { formatHTMLSting } from "./_helpers";
import type { NoteListTabContentRenderComponentProps } from "./_types";

const NoteListTabContentOfCards: NamedExoticComponent<NoteListTabContentRenderComponentProps> =
  memo(({ dataSource = [], isLoading, setSelectedItem }) => {
    const { t } = useTranslation();

    const isEmpty = useMemo<boolean>(() => !dataSource.length, [dataSource]);

    if (isLoading) {
      return <CustomLoadingScreen />;
    }

    return (
      <MuiBox
        sx={{
          minHeight: "800px",
          height: "calc(100svh - 150px)",
          maxHeight: "calc(100svh - 150px)",
        }}
      >
        {isEmpty && <MuiTypography>データがありません</MuiTypography>}

        {!isEmpty && (
          <MuiGrid container spacing={2} sx={{ p: 2 }}>
            {dataSource.map((item) => (
              <MuiGrid key={item._id} size={{ xs: 6, lg: 4 }}>
                <CardWithPulldownMenuList
                  primaryTitle={formatHTMLSting(item.message)}
                  secondaryTitle={
                    <>
                      <div>
                        <strong>{t("common.labels.created_at")}</strong>&nbsp;&nbsp;
                        {formatDate(item.created_at)}
                      </div>
                      <div>
                        <strong>{t("common.labels.created_at")}</strong>&nbsp;&nbsp;
                        {formatDate(item.updated_at)}
                      </div>
                    </>
                  }
                  sx={{
                    "&:hover": { boxShadow: 8 },
                  }}
                  onClick={() => setSelectedItem(item)}
                  actionMenuList={[
                    {
                      icon: <Icon icon="solar:trash-bin-trash-bold-duotone" />,
                      label: t("common.buttons.delete"),
                      onClick: () => {},
                      isErrorAction: true,
                    },
                  ]}
                />
              </MuiGrid>
            ))}
          </MuiGrid>
        )}
      </MuiBox>
    );
  });

export default NoteListTabContentOfCards;
