import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  routeRules: {
    '/api/*': {
      cors: true,
    }
  },
  compatibilityDate: "latest",
  srcDir: "server",
  imports: false
});