import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      plugins: [],
    },
  },
  // resolve: {
  //   alias: {
  //     '@assets':'src/assets',
  //   },
  // },
  // build: {
  //   rollupOptions: {
  //     external: [
  //       //'@assets/icons/roomBooking.svg',
  //       '@assets/icons/multipleroomBooking.svg',
  //       '@assets/commonData/DashboardData',
  //     ],
  //   },
  // },
})
