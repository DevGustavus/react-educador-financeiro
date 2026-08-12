const env = {
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY as string | undefined,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const

export { env }
