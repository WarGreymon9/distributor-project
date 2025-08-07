import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [
    uni(),
    {
      name: 'copy-package-json',
      writeBundle() {
        // 复制 package.json 到小程序目录
        const fs = require('fs')
        const path = require('path')
        const src = path.resolve('package.json')
        const dest = path.resolve('dist/dev/mp-weixin/package.json')
        fs.copyFileSync(src, dest)
      }
    }
  ],
  // 添加构建配置
  build: {
    // 确保NPM包被正确处理
    rollupOptions: {
      external: [],
      output: {
        // 复制 package.json 到输出目录
      }
    }
  }
})