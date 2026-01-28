import { defineNitroConfig } from "nitropack/config"

// https://nitro.build/config
export default defineNitroConfig({
  routeRules: {
    // Ceci intercepte la requête OPTIONS avant qu'elle n'arrive à ton fichier .post
    '/api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    },
  },
  compatibilityDate: "latest",
  srcDir: "server",
  imports: false
});
