/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_NODE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
