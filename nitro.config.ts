import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  routeRules: {
    '/api/*': {
      cors: true,
      headers: {
        'access-control-allow-methods': 'GET, POST, OPTIONS',
        'access-control-allow-origin': '',
        'access-control-allow-headers': 'Content-Type'
      }
    }
  },
  compatibilityDate: "latest",
  srcDir: "server",
  imports: false
});