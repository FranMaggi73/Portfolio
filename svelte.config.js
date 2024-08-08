import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build', // Verifica que esto sea correcto
      assets: 'build', // Verifica que esto sea correcto
      fallback: null
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/portfolio-sveltekit' : ''
    },
    alias: {
      $lib: 'src/lib'
    }
  }
};

export default config;
