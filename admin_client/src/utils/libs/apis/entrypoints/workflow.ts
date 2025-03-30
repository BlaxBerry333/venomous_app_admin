export const WORKFLOW_ENTRYPOINTS = {
  list: {
    url: "/workflow/data/",
    method: "GET",
    description: "获取所有的工作流列表",
  },
  create: {
    url: "/workflow/data/",
    method: "POST",
    description: "创建工作流",
  },
  detail: {
    url: "/workflow/data/:id/",
    method: "GET",
    description: "获取指定的工作流详情",
  },
  update: {
    url: "/workflow/data/:id/",
    method: "PUT",
    description: "更新指定的工作流",
  },
  delete: {
    url: "/workflow/data/:id/",
    method: "DELETE",
    description: "删除指定的工作流",
  },
  downloadAll: {
    url: "/workflow/download/",
    method: "GET",
    description: "下载所有的工作流",
  },
  download: {
    url: "/workflow/download/:id/",
    method: "GET",
    description: "下载指定的工作流",
  },
} as const;
