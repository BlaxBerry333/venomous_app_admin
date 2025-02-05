import type { ReactNode } from "react";
import { memo, startTransition, useCallback, useState } from "react";

import MuiTabContext from "@mui/lab/TabContext";
import MuiTabList from "@mui/lab/TabList";
import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid2";
import MuiTab from "@mui/material/Tab";
import MuiToggleButton from "@mui/material/ToggleButton";
import MuiToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { Icon } from "@iconify/react";

import useTranslation from "~/common/hooks/useTranslation";
import type { ArrayElementOf, Nullable } from "~/common/types/tools";
import { SelectableNoteType } from "~/services/types/notes";
import { SUPPORTED_NOTE_LIST_CONTENT_TABS } from "./_helpers";
import { SupportedNoteListContentType } from "./_types";

const DEFAULT_VALUE = {
  contentType: SupportedNoteListContentType.Table,
  tabIndex: SUPPORTED_NOTE_LIST_CONTENT_TABS.findIndex(
    (item) => item.type === SelectableNoteType.ALL,
  ),
};

type TabType = ArrayElementOf<typeof SUPPORTED_NOTE_LIST_CONTENT_TABS>;

const NoteListTabContent = memo<{
  renderContentOfTableType: (tab: TabType) => ReactNode;
  renderContentOfCardType: (tab: TabType) => ReactNode;
  renderContentFilter: () => ReactNode;
}>(({ renderContentOfTableType, renderContentOfCardType, renderContentFilter }) => {
  const { t } = useTranslation();

  // ------------------------------------------------------------------

  const [tabIndex, setTabIndex] = useState<number>(0);
  const changeTabIndex = useCallback(
    (index: number) => startTransition(() => setTabIndex(index)),
    [],
  );

  // ------------------------------------------------------------------

  const [contentType, setContentType] = useState<SupportedNoteListContentType>(
    DEFAULT_VALUE.contentType,
  );
  const handleChangeContentType = useCallback(
    (_: React.MouseEvent<HTMLElement>, value: Nullable<SupportedNoteListContentType>) => {
      if (value === null) return;
      startTransition(() => setContentType(value));
    },
    [],
  );

  // ------------------------------------------------------------------

  return (
    <MuiBox
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MuiTabContext value={tabIndex.toString()}>
        <MuiGrid container sx={{ alignItems: "flex-end" }}>
          <MuiGrid size={10}>
            <MuiTabList
              variant="scrollable"
              onChange={(_: React.SyntheticEvent, index: number) => changeTabIndex(index)}
              sx={{
                "& .MuiTabs-indicator": { visibility: "hidden !important" },
                "& .MuiTabs-flexContainer": { gap: "0 !important" },
              }}
            >
              {SUPPORTED_NOTE_LIST_CONTENT_TABS.map((tab, index) => {
                const isSelected: boolean = index === Number(tabIndex);
                return (
                  <MuiTab
                    key={tab.type}
                    label={t(`notes.note-data-type.${tab.type}`)}
                    value={index.toString()}
                    sx={{
                      typography: "subtitle2",
                      p: 0,
                      border: 1,
                      borderBottom: 0,
                      borderTopLeftRadius: 6,
                      borderTopRightRadius: 6,
                      borderColor: isSelected ? "divider" : "transparent",
                      bgcolor: isSelected ? "divider" : "transparent",
                    }}
                  />
                );
              })}
            </MuiTabList>
          </MuiGrid>
          <MuiGrid
            size={2}
            sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}
          >
            {renderContentFilter()}

            <MuiToggleButtonGroup value={contentType} exclusive onChange={handleChangeContentType}>
              {[
                {
                  value: SupportedNoteListContentType.Table,
                  icon: <Icon icon="solar:list-bold" width={20} />,
                },
                {
                  value: SupportedNoteListContentType.Cards,
                  icon: <Icon icon="solar:widget-line-duotone" width={20} />,
                },
              ].map((item) => (
                <MuiToggleButton
                  key={item.value}
                  size="large"
                  value={item.value}
                  sx={{ borderBottom: 0, borderEndStartRadius: 0, borderEndEndRadius: 0 }}
                >
                  {item.icon}
                </MuiToggleButton>
              ))}
            </MuiToggleButtonGroup>
          </MuiGrid>
        </MuiGrid>

        <MuiBox
          sx={{
            flex: 1,
            overflow: "auto",
            border: 1,
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
            borderColor: "divider",
            bgcolor: "divider",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {contentType === SupportedNoteListContentType.Table &&
            renderContentOfTableType(SUPPORTED_NOTE_LIST_CONTENT_TABS[tabIndex])}
          {contentType === SupportedNoteListContentType.Cards &&
            renderContentOfCardType(SUPPORTED_NOTE_LIST_CONTENT_TABS[tabIndex])}
        </MuiBox>
      </MuiTabContext>
    </MuiBox>
  );
});

export default NoteListTabContent;
