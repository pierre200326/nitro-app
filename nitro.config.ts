import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  routeRules: {
    // 1. On crée le "pont" vers ton autre API Vercel
    '/api-game/**': { 
      proxy: 'https://nitro-app-bice.vercel.app/api/**' 
    },
    '/api/*': {
      cors: true,
    }
  },
  compatibilityDate: "latest",
  srcDir: "server",
  imports: false
});
