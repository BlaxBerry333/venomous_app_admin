export const ROUTE_SEGMENTS = {
  auth: "auth" as const,
  auth_signup: "signup" as const,
  auth_login: "login" as const,
  dashboard: "dashboard" as const,
  accounts: "accounts" as const,
  report: "report" as const,
  workflow: "workflow" as const,
  playground: "playground" as const,
  note: "note" as const,
  editor: "editor" as const,

  list: "list" as const,
  specific_id: ":id" as const,
  detail: "detail" as const,
  error: "error" as const,
  unknown: "unknown" as const,
};

export const ROUTE_PATHS = {
  root: "/" as const,
  error: {
    403: `/${ROUTE_SEGMENTS.error}/403` as const,
    404: `/${ROUTE_SEGMENTS.error}/404` as const,
    500: `/${ROUTE_SEGMENTS.error}/500` as const,
    unknown: `/${ROUTE_SEGMENTS.error}/unknown` as const,
  },
  auth: {
    root: `/${ROUTE_SEGMENTS.auth}` as const,
    signUp: `/${ROUTE_SEGMENTS.auth}/${ROUTE_SEGMENTS.auth_signup}` as const,
    login: `/${ROUTE_SEGMENTS.auth}/${ROUTE_SEGMENTS.auth_login}` as const,
  },
  dashboard: {
    root: `/${ROUTE_SEGMENTS.dashboard}` as const,
    accounts: {
      root: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.accounts}` as const,
      list: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.accounts}/${ROUTE_SEGMENTS.list}` as const,
      id: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.accounts}/${ROUTE_SEGMENTS.specific_id}` as const,
    },
    report: {
      root: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.report}` as const,
      list: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.report}/${ROUTE_SEGMENTS.list}` as const,
      id: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.report}/${ROUTE_SEGMENTS.specific_id}` as const,
    },
    workflow: {
      root: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.workflow}` as const,
      list: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.workflow}/${ROUTE_SEGMENTS.list}` as const,
      playground:
        `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.workflow}/${ROUTE_SEGMENTS.playground}` as const,
    },
    note: {
      root: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.note}` as const,
      list: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.note}/${ROUTE_SEGMENTS.list}` as const,
      editor:
        `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.note}/${ROUTE_SEGMENTS.editor}` as const,
    },
  },
};
