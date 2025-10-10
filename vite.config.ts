import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import path from 'path';



export default defineConfig({

    server: { host: '0.0.0.0', port: 5174 },

    plugins: [
        remix({
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
            },
        }),
        tsconfigPaths(),
        nodePolyfills({
            include: ['url'],
            protocolImports: true
        }),
        netlifyPlugin({ unstable_edge: true })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './app'),
        },
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    build: {
        minify: 'esbuild',
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                }
            }
        }
    }
});