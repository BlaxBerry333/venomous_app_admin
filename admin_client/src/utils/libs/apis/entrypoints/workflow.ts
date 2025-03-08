export const WORKFLOW_ENTRYPOINTS = {
  list: {
    url: "/workflow/data/",
    method: "GET",
    description: "获取工作流列表",
  },
  create: {
    url: "/workflow/data/",
    method: "POST",
    description: "创建工作流",
  },
  detail: {
    url: "/workflow/data/:id/",
    method: "GET",
    description: "获取工作流详情",
  },
  update: {
    url: "/workflow/data/:id/",
    method: "PUT",
    description: "更新工作流",
  },
  delete: {
    url: "/workflow/data/:id/",
    method: "DELETE",
    description: "删除工作流",
  },
} as const;
