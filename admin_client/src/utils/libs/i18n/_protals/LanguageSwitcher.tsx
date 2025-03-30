import type { NamedExoticComponent } from "react";
import { memo, useCallback, useMemo } from "react";

import { BasePosition } from "~/ui/_helpers";
import {
  AnimationIconButton,
  Menu,
  Popover,
  Portal,
  usePopover,
  type ListItemProps,
} from "~/ui/components";
import {
  authLayoutdashboardLanguageProtalElementID,
  dashboardLanguageProtalElementID,
} from "~/ui/templates";
import { I18nItems } from "../_helpers";
import { useLocales, useTranslation } from "../_hooks";

const LanguageSwitcher: NamedExoticComponent = memo(() => {
  const { flagIcon, LangugaesList } = useLanguageSwitcher();

  const popover = usePopover();

  const languageSwitcher = useMemo(() => {
    return (
      <>
        <AnimationIconButton icon={flagIcon} onClick={popover.handleOpen} />
        <Popover
          isOpen={popover.isOpen}
          anchorEl={popover.anchorEl}
          handleClose={popover.handleClose}
          position={BasePosition.BOTTOM_CENTER}
        >
          <Menu list={LangugaesList} />
        </Popover>
      </>
    );
  }, [popover, flagIcon, LangugaesList]);

  return (
    <>
      <Portal targetElementID={authLayoutdashboardLanguageProtalElementID}>
        {languageSwitcher}
      </Portal>
      <Portal targetElementID={dashboardLanguageProtalElementID}>{languageSwitcher}</Portal>
    </>
  );
});

export default LanguageSwitcher;

function useLanguageSwitcher() {
  const { i18nLang, flagIcon } = useLocales();
  const { changeLanguage } = useTranslation();

  const checkIsSelected = useCallback(
    (lang: string): boolean => {
      return i18nLang === lang;
    },
    [i18nLang],
  );

  const LangugaesList = useMemo<ListItemProps[]>(() => {
    return Object.entries(I18nItems)
      .map(([, item]) => item)
      .map((item) => ({
        title: item.label,
        icon: item.icon,
        selected: checkIsSelected(item.i18nLang),
        onClick: () => changeLanguage(item.i18nLang),
      }));
  }, [checkIsSelected, changeLanguage]);

  return {
    flagIcon,
    LangugaesList,
  };
}
