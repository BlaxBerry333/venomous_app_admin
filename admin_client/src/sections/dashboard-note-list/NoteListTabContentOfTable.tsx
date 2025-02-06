import type { NamedExoticComponent } from "react";
import { memo, useMemo } from "react";

import { Icon } from "@iconify/react";

import MuiTypography from "@mui/material/Typography";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid/components";
import type {
  GridColDef as MuiGridColDef,
  GridRenderCellParams as MuiGridRenderCellParams,
  GridRowParams as MuiGridRowParams,
} from "@mui/x-data-grid/models";

import useTranslation from "~/common/hooks/useTranslation";
import { formatDate } from "~/common/utils/handle-date-formatters";
import { formatHTMLSting } from "./_helpers";
import type { NoteListTabContentRenderComponentProps } from "./_types";

const NoteListTabContentOfTable: NamedExoticComponent<NoteListTabContentRenderComponentProps> =
  memo(({ dataSource = [], isLoading, setSelectedItem, deleteSelectedItem }) => {
    const isEmpty = useMemo<boolean>(() => !dataSource.length, [dataSource]);

    const columns = useNoteListTableColumns({ deleteSelectedItem });

    return (
      <MuiDataGrid
        rows={dataSource}
        columns={columns}
        loading={isLoading}
        rowHeight={60}
        disableColumnMenu
        disableColumnResize
        disableColumnSorting={isEmpty}
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
        autoPageSize={false}
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        onRowClick={({ row }) => setSelectedItem(row)}
        slots={{
          noRowsOverlay: () => <MuiTypography>データがありません</MuiTypography>,
          noResultsOverlay: () => <MuiTypography>検索結果がありません</MuiTypography>,
          moreActionsIcon: () => <Icon icon="solar:menu-dots-bold" width={24} />,
        }}
        sx={{
          minHeight: "800px",
          height: "calc(100svh - 150px)",
          maxHeight: "calc(100svh - 150px)",
          border: 0,
          bgcolor: "background.default",
          "& .MuiDataGrid-row": { cursor: "pointer" },
          "& .MuiDataGrid-cell": { outline: "none !important", userSelect: "none" },
          "& .MuiDataGrid-columnHeaders": { opacity: isEmpty ? 0 : 1 },
          "& .MuiDataGrid-columnHeader": { outline: "none !important", bgcolor: "divider" },
          "& .MuiDataGrid-columnHeaderTitle": { fontWeight: "bold !important" },
          "& .MuiDataGrid-columnSeparator": { display: "none !important" },
        }}
        slotProps={{
          basePopper: {
            sx: {
              "& .MuiDataGrid-menuList": {
                m: 0,
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
              },
            },
          },
        }}
      />
    );
  });

export default NoteListTabContentOfTable;

function useNoteListTableColumns({
  deleteSelectedItem,
}: Pick<NoteListTabContentRenderComponentProps, "deleteSelectedItem">) {
  const { t } = useTranslation();

  const columns = useMemo<MuiGridColDef[]>(
    () => [
      {
        field: " ",
        headerName: "#",
        width: 100,
        headerAlign: "center",
        align: "center",
        renderCell: (params: MuiGridRenderCellParams) => {
          const index = params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1;
          return index < 10 ? `0${index}` : index;
        },
        filterable: false,
        sortable: false,
      },
      {
        field: "message",
        headerName: t("notes.note-data.message"),
        description: t("notes.note-data.message"),
        flex: 1,
        filterable: false,
        renderCell: (params: MuiGridRenderCellParams) => {
          return formatHTMLSting(params.row.message);
        },
      },
      {
        field: "created_at",
        headerName: t("notes.note-data.created_at"),
        description: t("notes.note-data.created_at"),
        width: 150,
        filterable: false,
        renderCell: (params: MuiGridRenderCellParams) => {
          return formatDate(params.row.created_at);
        },
      },
      {
        field: "updated_at",
        headerName: t("notes.note-data.updated_at"),
        description: t("notes.note-data.updated_at"),
        width: 150,
        filterable: false,
        renderCell: (params: MuiGridRenderCellParams) => {
          return formatDate(params.row.updated_at);
        },
      },
      {
        field: "action",
        type: "actions",
        headerName: " ",
        width: 60,
        align: "center",
        headerAlign: "center",
        filterable: false,
        resizable: false,
        sortable: false,
        disableColumnMenu: true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getActions: (_: MuiGridRowParams) => {
          return [
            <GridActionsCellItem
              showInMenu
              label={t("common.buttons.delete")}
              key={t("common.buttons.delete")}
              sx={{
                borderRadius: 1,
                color: "error.main",
                "& svg": { color: "error.main" },
              }}
              icon={<Icon icon="solar:trash-bin-trash-bold-duotone" width={20} />}
              onClick={async (e) => {
                e.stopPropagation();
                await new Promise((resolve) => setTimeout(resolve, 250));
                deleteSelectedItem();
              }}
            />,
          ];
        },
      },
    ],
    [t, deleteSelectedItem],
  );

  return columns;
}
