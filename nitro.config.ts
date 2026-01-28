import { defineNitroConfig } from "nitropack/config"

// https://nitro.build/config
export default defineNitroConfig({
  routeRules: {
    // Ceci intercepte la requête OPTIONS avant qu'elle n'arrive à ton fichier .post
    '/api/v1/**': { cors: true, headers: { 'access-control-allow-methods': 'GET, POST, OPTIONS' } },
  },
  compatibilityDate: "latest",
  srcDir: "server",
  imports: false
});
