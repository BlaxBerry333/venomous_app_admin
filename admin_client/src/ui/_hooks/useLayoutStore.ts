import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { ADMIN_CLIENT_CONFIGS } from "~/configs";

export const HEADER_HEIGHT = 48;

export const NAV_MENU_WIDTH = {
  EXPANDED_IN_LARGE_SCREEN: 200,
  COLLAPSED_IN_LARGE_SCREEN: 72,
};

export const SETTING_DRAWER_WIDTH = 300;

export enum NavPosition {
  VerticalNavPosition = "VerticalNavPosition",
  HorizontalNavPosition = "HorizontalNavPosition",
}

export const DEFAULT_NAV_POSITION = NavPosition.VerticalNavPosition;

/**
 * 布局状态
 */
const useLayoutStore = create<{
  navMenuWidthInLargeScreen: number;
  navMenuExpandedInLargeScreen: boolean;
  setNavMenuExpandedInLargeScreen: (isExpanded: boolean) => void;
  toggleNavMenuExpandedInLargeScreen: () => void;

  navMenuPosition: NavPosition;
  setNavMenuPosition: (name: NavPosition) => void;
  toggleNavMenuPosition: () => void;
}>()(
  devtools(
    persist(
      (set) => ({
        navMenuWidthInLargeScreen: NAV_MENU_WIDTH.EXPANDED_IN_LARGE_SCREEN,
        navMenuExpandedInLargeScreen: true,
        setNavMenuExpandedInLargeScreen: (isExpanded) => {
          set({
            navMenuExpandedInLargeScreen: isExpanded,
            navMenuWidthInLargeScreen: isExpanded
              ? NAV_MENU_WIDTH.EXPANDED_IN_LARGE_SCREEN
              : NAV_MENU_WIDTH.COLLAPSED_IN_LARGE_SCREEN,
          });
        },
        toggleNavMenuExpandedInLargeScreen: () => {
          set((state) => ({
            navMenuExpandedInLargeScreen: !state.navMenuExpandedInLargeScreen,
            navMenuWidthInLargeScreen: !state.navMenuExpandedInLargeScreen
              ? NAV_MENU_WIDTH.EXPANDED_IN_LARGE_SCREEN
              : NAV_MENU_WIDTH.COLLAPSED_IN_LARGE_SCREEN,
          }));
        },
        navMenuPosition: DEFAULT_NAV_POSITION,
        setNavMenuPosition: (navMenuPosition: NavPosition) => {
          set({ navMenuPosition });
        },
        toggleNavMenuPosition: () => {
          set((state) => ({
            navMenuPosition:
              state.navMenuPosition === NavPosition.VerticalNavPosition
                ? NavPosition.HorizontalNavPosition
                : NavPosition.VerticalNavPosition,
          }));
        },
      }),
      {
        name: ADMIN_CLIENT_CONFIGS.storeKeys.layout,
      },
    ),
  ),
);

export default useLayoutStore;
