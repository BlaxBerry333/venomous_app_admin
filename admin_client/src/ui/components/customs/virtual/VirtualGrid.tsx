import type { CSSProperties, ComponentProps } from "react";
import { forwardRef, memo, useMemo } from "react";

import { VirtuosoGrid, type VirtuosoGridProps } from "react-virtuoso";

import { useThemeBreakpoints } from "~/ui/_hooks";

type GridColsType = {
  xs: number; // < sm
  sm: number; // sm ~ md
  md: number; // md ~ lg
  lg: number; // lg ~ xl
  xl: number; // > xl
};

const defaultCols: GridColsType = {
  xs: 1, // 1行1个
  sm: 1, // 1行1个
  md: 2, // 1行2个
  lg: 3, // 1行3个
  xl: 4, // 1行4个
};

export type VirtualGridProps<T = unknown> = {
  list: T[];
  renderGridItem: (item: T, index: number) => React.ReactNode;
  gridStyle?: CSSProperties;
  gridItemStyle?: CSSProperties;
  cols?: Partial<GridColsType>;
};

const VirtualGrid = <T,>({
  list = [],
  renderGridItem,
  gridStyle,
  gridItemStyle,
  cols = defaultCols,
}: VirtualGridProps<T>) => {
  const { gridComponents } = useGridComponents({ gridStyle, gridItemStyle, cols });

  return (
    <VirtuosoGrid
      style={{ height: "100%" }}
      totalCount={list.length}
      components={gridComponents}
      itemContent={(index) => renderGridItem(list[index], index)}
    />
  );
};

const VirtualGridMemo = memo(VirtualGrid) as typeof VirtualGrid;
export default VirtualGridMemo;

// ----------------------------------------------------------------------------------------------------

type ListProps = {
  style?: CSSProperties;
  children?: React.ReactNode;
} & ComponentProps<"div">;

function useGridComponents({
  gridStyle,
  gridItemStyle,
  cols,
}: Pick<VirtualGridProps, "gridStyle" | "gridItemStyle" | "cols">) {
  const { isXs, isSm, isMd, isLg } = useThemeBreakpoints();

  const itemWidth = useMemo<string>(() => {
    let currentCols: number;
    if (isXs) currentCols = cols?.xs ?? defaultCols.xs;
    else if (isSm) currentCols = cols?.sm ?? defaultCols.sm;
    else if (isMd) currentCols = cols?.md ?? defaultCols.md;
    else if (isLg) currentCols = cols?.lg ?? defaultCols.lg;
    else currentCols = cols?.xl ?? defaultCols.xl;
    return `${100 / currentCols}%`;
  }, [isXs, isSm, isMd, isLg, cols]);

  const gridComponents = useMemo<VirtuosoGridProps<ListProps>["components"]>(
    () => ({
      List: forwardRef(({ style, children, ...props }, ref) => (
        <div
          ref={ref}
          {...props}
          style={{ display: "flex", flexWrap: "wrap", ...style, ...gridStyle }}
        >
          {children}
        </div>
      )),
      Item: ({ children, ...props }) => {
        return (
          <div
            {...props}
            style={{
              width: itemWidth,
              display: "flex",
              boxSizing: "border-box",
              flex: "none",
              alignContent: "stretch",
              padding: "0.5rem",
              ...gridItemStyle,
            }}
          >
            {children}
          </div>
        );
      },
    }),
    [itemWidth, gridStyle, gridItemStyle],
  );

  return {
    gridComponents,
  };
}
