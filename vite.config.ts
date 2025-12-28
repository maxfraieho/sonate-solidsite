import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemap({
      hostname: "https://violin.pp.ua",
      exclude: ["/admin/*", "/404"],
      dynamicRoutes: [
        "/",
        "/integration",
        "/support",
        "/contact",
        "/privacy",
      ],
      changefreq: "weekly",
      priority: 0.8,
      readable: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'leaflet-vendor': ['leaflet'],
          'form-vendor': ['zod', 'react-hook-form'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
