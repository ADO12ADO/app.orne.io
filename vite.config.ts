import path from 'node:path';
import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis',
			},
		},
	},

	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src'),
			'@terra-money/terra.js': '@terra-money/terra.js/dist/bundle.js',
			'readable-stream': 'vite-compatible-readable-stream',
		},
	},

	plugins: [React()],
});
