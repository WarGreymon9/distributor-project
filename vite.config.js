import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      uni(),
      {
        name: 'copy-package-json',
        writeBundle() {
          const fs = require('fs')
          const path = require('path')
          const src = path.resolve('package.json')
          const dest = path.resolve('dist/dev/mp-weixin/package.json')
          fs.copyFileSync(src, dest)
        }
      }
    ],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'https://hbkadmin.xiaohe.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    },
    build: {
      rollupOptions: {
        external: [],
        output: {}
      }
    }
  }
})