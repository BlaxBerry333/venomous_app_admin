import packageJson from "../../../package.json"; // eslint-disable-line no-restricted-imports

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
  },

  links: {
    repository: import.meta.env.VITE_LINK_REPOSITORY,
    twitter: import.meta.env.VITE_LINK_TWITTER,
  },

  storeKeys: {
    jwtAccessToken: "VENOMOUS_APP_ADMIN__JWT_TOKEN",
    jwtRefreshToken: "VENOMOUS_APP_ADMIN__JWT_REFRESH_TOKEN",
    appWorkflow: "VENOMOUS_APP_ADMIN__APP_WORKFLOW",
    appNote: "VENOMOUS_APP_ADMIN__APP_NOTE",
  },
} as const;
