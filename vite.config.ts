import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import svgr from 'vite-plugin-svgr'
import packageConfig from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    base: `/${packageConfig.name}/`,
    server: {
      host: '0.0.0.0',
      port: 9999,
      open: `/${packageConfig.name}/`,
      hmr: {
        host: '127.0.0.1',
        port: 9999,
      },
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    preview: {
      host: '0.0.0.0',
      port: 9999,
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      outDir: `build/${packageConfig.name}`,
    },
    plugins: [
      react(),
      svgr(),
      htmlPlugin(loadEnv(mode, '.')),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve('src/style/variables.less')}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
  })
)

function htmlPlugin(env: ReturnType<typeof loadEnv>) {
  return {
    name: 'html-transform',
    transformIndexHtml: {
      transform: (html: string): string =>
        html.replace(/{{(.*?)}}/g, (match, p1) =>
          env[p1] ?? match,
        ),
    },
  }
}
