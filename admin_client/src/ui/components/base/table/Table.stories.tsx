import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "~/ui/components/customs/icons";
import TabItemAction from "./TabItemAction";
import Table, { type TableColumnsType, type TableDataSourceType } from "./Table";

const meta = {
  title: "Components/Base ( MUI ) /Table ( MUI X )",
  component: Table,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    tableHeight: {
      description: "表格高度",
      control: "number",
    },
    rowHeight: {
      description: "行高",
      control: "number",
    },
    rowCount: {
      description: "行数",
      control: "number",
    },
    dataSource: {
      description: "数据源",
      control: "object",
    },
    columns: {
      description: "列配置",
      control: "object",
    },
    disableColumnMenu: {
      description: "禁用列菜单",
      control: "boolean",
    },
    disableColumnSorting: {
      description: "禁用列排序",
      control: "boolean",
    },
  },
  args: {
    tableHeight: 600,
    rowHeight: undefined,
    rowCount: undefined,
    dataSource: [],
    columns: [],
    disableColumnMenu: true,
    disableColumnSorting: false,
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",

  render: (args) => {
    type DataType = { id: string | number; name: string };

    const dataSource: TableDataSourceType<DataType> = Array(30)
      .fill("xxxxxx")
      .map((item, index) => ({
        id: index + new Date().getTime(),
        name: `${index}${item}`,
      }));

    const columns: TableColumnsType<DataType> = [
      {
        field: "index",
        headerName: "#",
        width: 50,
        sortable: false,
        renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
      },
      {
        field: "id",
        headerName: "ID",
        width: 200,
      },
      {
        field: "name",
        headerName: "Name",
        width: 200,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "操作",
        width: 100,
        sortable: false,
        getActions: () => [
          <TabItemAction
            label="删除"
            icon={<Icon icon="solar:trash-bin-trash-bold-duotone" width={20} />}
            onClick={() => console.log("删除1")}
          />,
          <TabItemAction
            showInMenu
            label="删除"
            icon={<Icon icon="solar:trash-bin-trash-bold-duotone" width={20} />}
            onClick={() => console.log("删除2")}
          />,
        ],
      },
    ];
    return (
      <Table<DataType>
        {...args}
        dataSource={dataSource}
        columns={columns}
        onRowClick={(params) => console.log(params.row)}
      />
    );
  },
};
