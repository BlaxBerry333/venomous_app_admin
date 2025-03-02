import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { UI_CONFIGS } from "../_configs";

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
  isExpandedInLargeScreen: boolean;
  setNavMenuExpandedInLargeScreen: (isExpanded: boolean) => void;
  toggleNavMenuExpandedInLargeScreen: () => void;

  navMenuPosition: NavPosition;
  setNavMenuPosition: (name: NavPosition) => void;
  toggleNavMenuPosition: () => void;
  reset: () => void;
}>()(
  devtools(
    persist(
      (set) => ({
        navMenuWidthInLargeScreen: UI_CONFIGS.size.NAV_MENU_WIDTH.EXPANDED_IN_LARGE_SCREEN,
        isExpandedInLargeScreen: true,
        setNavMenuExpandedInLargeScreen: (isExpanded) => {
          set({
            isExpandedInLargeScreen: isExpanded,
            navMenuWidthInLargeScreen: isExpanded
              ? UI_CONFIGS.size.NAV_MENU_WIDTH.EXPANDED_IN_LARGE_SCREEN
              : UI_CONFIGS.size.NAV_MENU_WIDTH.COLLAPSED_IN_LARGE_SCREEN,
          });
        },
        toggleNavMenuExpandedInLargeScreen: () => {
          set((state) => ({
            isExpandedInLargeScreen: !state.isExpandedInLargeScreen,
            navMenuWidthInLargeScreen: !state.isExpandedInLargeScreen
              ? UI_CONFIGS.size.NAV_MENU_WIDTH.EXPANDED_IN_LARGE_SCREEN
              : UI_CONFIGS.size.NAV_MENU_WIDTH.COLLAPSED_IN_LARGE_SCREEN,
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
        reset: () => {
          set({
            navMenuPosition: DEFAULT_NAV_POSITION,
          });
        },
      }),
      {
        name: UI_CONFIGS.storeKeys.layout,
      },
    ),
  ),
);

export default useLayoutStore;
