/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Add your new variable here:
  readonly VITE_SALESANALYSIS_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
