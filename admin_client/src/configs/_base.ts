import packageJson from "../../package.json";

export const ADMIN_CLIENT_CONFIGS = {
  info: {
    name: "Venomous Admin",
    version: packageJson.version,
    description: packageJson.description,
    author: packageJson.author,
    envName: import.meta.env.VITE_ADMIN_CLIENT_ENV_NAME,
    port: import.meta.env.VITE_ADMIN_CLIENT_PORT,
  },

  domain: {
    adminServer: import.meta.env.VITE_DOMAIN_ADMIN_SERVER,
    bff: import.meta.env.VITE_DOMAIN_BFF,
  },

  envUseMockData: import.meta.env.VITE_ADMIN_CLIENT_ENV_USE_MOCK_DATA,
} as const;
