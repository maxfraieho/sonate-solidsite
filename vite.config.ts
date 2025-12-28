import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";
import viteImagemin from "vite-plugin-imagemin";

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
        // French routes
        "/fr",
        "/fr/integration",
        "/fr/support",
        "/fr/contact",
        "/fr/privacy",
        // German routes (explicit)
        "/de",
        "/de/integration",
        "/de/support",
        "/de/contact",
        "/de/privacy",
        // Ukrainian routes
        "/uk",
        "/uk/integration",
        "/uk/support",
        "/uk/contact",
        "/uk/privacy",
      ],
      changefreq: "weekly",
      priority: 0.8,
      readable: true,
    }),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.7, 0.9] },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
      format: { comments: false },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'leaflet-vendor': ['leaflet'],
          'form-vendor': ['zod', 'react-hook-form'],
          'i18n-vendor': ['i18next', 'react-i18next'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
