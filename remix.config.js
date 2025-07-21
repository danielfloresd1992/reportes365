import { netlifyEdgeAdapter } from "@netlify/remix-edge-adapter";
import { vitePlugin as remix } from "@remix-run/dev";

/** @type {import('@remix-run/dev').AppConfig} */
export default {
    ignoredRouteFiles: ["**/.*"],
    server: netlifyEdgeAdapter(),  // Para Edge Functions
    // server: netlifyAdapter(),   // Para funciones estándar (Node.js)
    serverBuildPath: ".netlify/edge-functions/server.js",
    tailwind: true,
    postcss: true,
    watchPaths: ["./tailwind.config.ts"],
    future: {
        v3_fetcherPersist: true,
    },
};