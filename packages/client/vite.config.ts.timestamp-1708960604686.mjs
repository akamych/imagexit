// ../client/vite.config.ts
import { defineConfig } from "file:///home/mjleb/mnt/Projects/Yandex/team/git/imagexit_web/node_modules/vite/dist/node/index.js";
import react from "file:///home/mjleb/mnt/Projects/Yandex/team/git/imagexit_web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dotenv from "file:///home/mjleb/mnt/Projects/Yandex/team/git/imagexit_web/node_modules/dotenv/lib/main.js";
import { join } from "node:path";
import { buildSync } from "file:///home/mjleb/mnt/Projects/Yandex/team/git/imagexit_web/node_modules/esbuild/lib/main.js";
dotenv.config();
var vite_config_default = defineConfig({
  build: {
    chunkSizeWarningLimit: 100,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      }
    }
  },
  server: {
    port: Number(process.env.CLIENT_PORT) || 3e3
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001
  },
  plugins: [
    react(),
    {
      name: "service-worker",
      apply: "build",
      enforce: "post",
      transformIndexHtml() {
        buildSync({
          minify: true,
          bundle: true,
          entryPoints: [join(process.cwd(), "service-worker.js")],
          outfile: join(process.cwd(), "dist", "service-worker.js")
        });
      }
    }
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbWpsZWIvbW50L1Byb2plY3RzL1lhbmRleC90ZWFtL2dpdC9pbWFnZXhpdF93ZWIvcGFja2FnZXMvY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9tamxlYi9tbnQvUHJvamVjdHMvWWFuZGV4L3RlYW0vZ2l0L2ltYWdleGl0X3dlYi9wYWNrYWdlcy9jbGllbnQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWpsZWIvbW50L1Byb2plY3RzL1lhbmRleC90ZWFtL2dpdC9pbWFnZXhpdF93ZWIvcGFja2FnZXMvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52J1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGJ1aWxkU3luYyB9IGZyb20gJ2VzYnVpbGQnXG5kb3RlbnYuY29uZmlnKClcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb253YXJuKHdhcm5pbmcsIHdhcm4pIHtcbiAgICAgICAgaWYgKHdhcm5pbmcuY29kZSA9PT0gJ01PRFVMRV9MRVZFTF9ESVJFQ1RJVkUnKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgd2Fybih3YXJuaW5nKVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuQ0xJRU5UX1BPUlQpIHx8IDMwMDAsXG4gIH0sXG4gIGRlZmluZToge1xuICAgIF9fU0VSVkVSX1BPUlRfXzogcHJvY2Vzcy5lbnYuU0VSVkVSX1BPUlQgfHwgMzAwMSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAge1xuICAgICAgbmFtZTogJ3NlcnZpY2Utd29ya2VyJyxcbiAgICAgIGFwcGx5OiAnYnVpbGQnLFxuICAgICAgZW5mb3JjZTogJ3Bvc3QnLFxuICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKCkge1xuICAgICAgICBidWlsZFN5bmMoe1xuICAgICAgICAgIG1pbmlmeTogdHJ1ZSxcbiAgICAgICAgICBidW5kbGU6IHRydWUsXG4gICAgICAgICAgZW50cnlQb2ludHM6IFtqb2luKHByb2Nlc3MuY3dkKCksICdzZXJ2aWNlLXdvcmtlci5qcycpXSxcbiAgICAgICAgICBvdXRmaWxlOiBqb2luKHByb2Nlc3MuY3dkKCksICdkaXN0JywgJ3NlcnZpY2Utd29ya2VyLmpzJyksXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgIH0sXG4gIF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpWSxTQUFTLG9CQUFvQjtBQUM5WixPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsWUFBWTtBQUNyQixTQUFTLGlCQUFpQjtBQUMxQixPQUFPLE9BQU87QUFHZCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCx1QkFBdUI7QUFBQSxJQUN2QixlQUFlO0FBQUEsTUFDYixPQUFPLFNBQVMsTUFBTTtBQUNwQixZQUFJLFFBQVEsU0FBUywwQkFBMEI7QUFDN0M7QUFBQSxRQUNGO0FBQ0EsYUFBSyxPQUFPO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNLE9BQU8sUUFBUSxJQUFJLFdBQVcsS0FBSztBQUFBLEVBQzNDO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixpQkFBaUIsUUFBUSxJQUFJLGVBQWU7QUFBQSxFQUM5QztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ047QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULHFCQUFxQjtBQUNuQixrQkFBVTtBQUFBLFVBQ1IsUUFBUTtBQUFBLFVBQ1IsUUFBUTtBQUFBLFVBQ1IsYUFBYSxDQUFDLEtBQUssUUFBUSxJQUFJLEdBQUcsbUJBQW1CLENBQUM7QUFBQSxVQUN0RCxTQUFTLEtBQUssUUFBUSxJQUFJLEdBQUcsUUFBUSxtQkFBbUI7QUFBQSxRQUMxRCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
