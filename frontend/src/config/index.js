// Configuración de la aplicación
export const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",

  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || "INIT",
  APP_VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",

  // Development Configuration
  DEV_MODE: import.meta.env.VITE_DEV_MODE === "true" || true,

  // Auth Configuration
  TOKEN_KEY: "access_token",
  REFRESH_TOKEN_KEY: "refresh_token",
  USER_KEY: "user",
};

export default config;
