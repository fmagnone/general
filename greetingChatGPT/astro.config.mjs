import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), svelte()],
  output: "static",
  adapter: node({
    mode: "standalone"
  })
});