import { netlifyEdgeAdapter } from "@netlify/remix-edge-adapter";

export default {
    ignoredRouteFiles: ["**/.*"],
    server: netlifyEdgeAdapter(),
    serverBuildPath: ".netlify/edge-functions/server.js",
    // Mantén el resto de tu configuración
};