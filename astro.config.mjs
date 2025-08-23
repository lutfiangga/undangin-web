// @ts-check
import { defineConfig, sharpImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import "dotenv/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: false,
    },
    define: {
      "process.env": process.env,
    },
  },
  image: {
    service: sharpImageService(),
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});