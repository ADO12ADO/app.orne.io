import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			plugins: [rollupNodePolyFill()],
		},
	},

	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis',
			},
			plugins: [
				NodeGlobalsPolyfillPlugin({
					process: true,
					buffer: true,
				}),
				NodeModulesPolyfillPlugin(),
			],
		},
	},

	resolve: {
		alias: {
			'~': resolve(__dirname, 'src'),
		},
	},

	plugins: [React()],
});
