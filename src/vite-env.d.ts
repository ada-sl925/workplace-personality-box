/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ANALYTICS_ENABLED: string
  readonly VITE_ANALYTICS_DEFAULT_ANONYMIZE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly DEV: boolean
  readonly PROD: boolean
}