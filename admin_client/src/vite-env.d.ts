/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  // AdminClient Server Info
  // ----------------------------------------------------------------------------------------------------
  VITE_ADMIN_CLIENT_NAME: string;
  VITE_ADMIN_CLIENT_ENV_NAME: "development" | "production";
  VITE_ADMIN_CLIENT_PORT: string;
  VITE_ADMIN_CLIENT_ENV_USE_MOCK_DATA: boolean;

  // Domain
  // ----------------------------------------------------------------------------------------------------
  VITE_DOMAIN_ADMIN_SERVER: string;
  VITE_DOMAIN_BFF: string;

  // Links
  // ----------------------------------------------------------------------------------------------------
  VITE_LINK_REPOSITORY: string;
  VITE_LINK_TWITTER: string;
}
