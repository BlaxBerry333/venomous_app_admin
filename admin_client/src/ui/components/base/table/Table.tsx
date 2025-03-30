import { memo, useMemo } from "react";

import {
  DataGrid as MuiDataGrid,
  type GridValidRowModel,
  type DataGridProps as MuiDataGridProps,
  type GridColDef as MuiGridColDef,
} from "@mui/x-data-grid";

import { Icon } from "~/ui/components/customs/icons";
import { BlankContentImage } from "~/ui/components/design";

type TableBaseItemType = {
  id: string | number;
};

type TableColumnType<T extends GridValidRowModel> = MuiGridColDef & {
  field: keyof T | "index" | "actions";
};

export type TableDataSourceType<T extends TableBaseItemType> = Array<T>;

export type TableColumnsType<T extends GridValidRowModel> = Array<TableColumnType<T>>;

export type TableProps<T extends TableBaseItemType> = Omit<MuiDataGridProps, "rows" | "columns"> & {
  dataSource: TableDataSourceType<T>;
  columns: TableColumnsType<T>;
  tableHeight: number;
  rowHeight?: number;
  rowCount?: number;
};

const Table = <T extends TableBaseItemType>({
  dataSource = [],
  columns = [],
  loading,
  onRowClick,
  tableHeight,
  rowHeight,
  rowCount = 10,
  ...props
}: TableProps<T>) => {
  const isEmpty = useMemo<boolean>(() => !dataSource?.length, [dataSource]);

  const data = useMemo<TableDataSourceType<T>>(
    () => dataSource.map((item) => ({ ...item, id: String(item.id) })),
    [dataSource],
  );

  const rowHeightValue = useMemo<number | undefined>(() => {
    if (rowHeight) return rowHeight;
    if (rowCount) return Math.ceil(tableHeight / rowCount);
    return undefined;
  }, [rowHeight, rowCount, tableHeight]);

  return (
    <MuiDataGrid
      rows={data}
      columns={columns}
      loading={loading}
      disableColumnMenu
      disableColumnResize
      disableColumnSorting={isEmpty}
      disableRowSelectionOnClick
      getRowId={(row) => row.id}
      columnBufferPx={rowHeightValue ? rowHeightValue * rowCount : 0} // virtualization
      rowHeight={rowHeightValue}
      pageSizeOptions={props.autoPageSize ? undefined : [rowCount, rowCount * 2, rowCount * 5]}
      autoPageSize={props.autoPageSize}
      initialState={{
        pagination: { paginationModel: { pageSize: rowCount }, ...props.initialState?.pagination },
        ...props.initialState,
      }}
      onRowClick={onRowClick}
      sx={{
        minHeight: tableHeight,
        height: tableHeight,
        maxHeight: tableHeight,
        border: 0,
        bgcolor: "background.default",
        "& .MuiDataGrid-row": { cursor: "pointer" },
        "& .MuiDataGrid-cell": { outline: "none !important", borderTopStyle: "dashed" },
        "& .MuiDataGrid-columnSeparator": { display: "none" },
        "& .MuiDataGrid-columnHeader": { outline: "none !important", bgcolor: "divider" },
        "& .MuiDataGrid-columnHeaderTitle": { fontWeight: "bold !important" },
        "& .MuiDataGrid-columnHeaders": { opacity: isEmpty ? 0.5 : 1 },
        "& .MuiDataGrid-columnHeaderDraggableContainer": {
          cursor: isEmpty ? "not-allowed" : "pointer",
        },
        "& .MuiDataGrid-columnHeaderTitleContainer": {
          justifyContent: "space-between",
        },
        ...props.sx,
      }}
      slotProps={{
        basePopper: { placement: "bottom-end" },
        baseChip: { size: "small" },
        baseSwitch: { size: "small" },
        baseCheckbox: { size: "small", disableRipple: true },
        baseInputLabel: { shrink: true },
        baseTextField: { variant: "outlined" },
        baseSelect: { native: true, variant: "outlined" },
        ...props.slotProps,
      }}
      slots={{
        noRowsOverlay: () => <BlankContentImage />,
        noResultsOverlay: () => <BlankContentImage />,
        moreActionsIcon: (props) => <Icon icon="solar:menu-dots-bold-duotone" {...props} />,
        exportIcon: (props) => <Icon icon="solar:eye-closed-bold-duotone" {...props} />,

        columnMenuSortAscendingIcon: () => <Icon icon="solar:alt-arrow-up-bold-duotone" />,
        columnMenuSortDescendingIcon: () => <Icon icon="solar:alt-arrow-down-bold-duotone" />,
        columnMenuFilterIcon: () => <Icon icon="solar:filter-bold-duotone" />,
        columnMenuHideIcon: () => <Icon icon="solar:eye-closed-bold-duotone" />,
        columnMenuManageColumnsIcon: () => <Icon icon="solar:eye-bold-duotone" />,
      }}
      {...props}
    />
  );
};

export default memo(Table) as typeof Table;
