import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path';
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ],
  server: {
    proxy: {
      '/foo':'http://127.0.0.1:5000'
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
