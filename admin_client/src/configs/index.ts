import packageJson from "../../package.json";

export const ADMIN_CLIENT_CONFIGS = {
  info: {
    name: import.meta.env.VITE_ADMIN_CLIENT_NAME,
    version: packageJson.version,
    description: packageJson.description,
    author: packageJson.author,
    envName: import.meta.env.VITE_ADMIN_CLIENT_ENV_NAME,
    port: import.meta.env.VITE_ADMIN_CLIENT_PORT,
    envUseMockData: import.meta.env.VITE_ADMIN_CLIENT_ENV_USE_MOCK_DATA,
  },

  domain: {
    adminClient: import.meta.env.VITE_DOMAIN_ADMIN_CLIENT,
    adminServer: import.meta.env.VITE_DOMAIN_ADMIN_SERVER,
    bff: import.meta.env.VITE_DOMAIN_BFF,
  },

  links: {
    repository: import.meta.env.VITE_LINK_REPOSITORY,
    twitter: import.meta.env.VITE_LINK_TWITTER,
  },

  storeKeys: {
    theme: "VENOMOUS_APP_ADMIN__THEME",
    layout: "VENOMOUS_APP_ADMIN__LAYOUT",
    settings: "VENOMOUS_APP_ADMIN__SETTINGS",
    language: "VENOMOUS_APP_ADMIN__LANGUAGE",
    jwtAccessToken: "VENOMOUS_APP_ADMIN__JWT_TOKEN",
    jwtRefreshToken: "VENOMOUS_APP_ADMIN__JWT_REFRESH_TOKEN",
    appSetting: "VENOMOUS_APP_ADMIN__APP_SETTING",
    appWorkflow: "VENOMOUS_APP_ADMIN__APP_WORKFLOW",
    appNote: "VENOMOUS_APP_ADMIN__APP_NOTE",
  },
} as const;
