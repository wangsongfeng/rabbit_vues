import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({importStyle: "sass"})],
    }),],

    css: {
        preprocessorOptions: {
            scss: {
                // 2. 自动导入定制化样式文件进行样式覆盖
                additionalData: ` 
                 @use "@/styles/element/index.scss" as *;
                 @use "@/styles/var.scss" as *;
               `,
            }
        }
    },
    resolve: {
      alias: [
        {find: "@", replacement: path.resolve(__dirname, "src") },
        { find: "@api", replacement: path.resolve(__dirname, "src/api") },
      ],
    },
    base: "./",
})
