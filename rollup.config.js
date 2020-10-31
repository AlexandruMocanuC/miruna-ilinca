import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import autoPreprocess from "svelte-preprocess";

const isDev = Boolean(process.env.ROLLUP_WATCH);

export default {
	input: "src/main.js",
	output: {
		sourcemap: true,
		format: "iife",
		name: "app",
		file: "docs/bundle.js",
	},
	plugins: [
		svelte({
			hydratable: true,
			// enable run-time checks when not in production
			dev: isDev,

			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write("docs/bundle.css");
			},
			preprocess: autoPreprocess(),
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: importee =>
				importee === "svelte" || importee.startsWith("svelte/"),
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		// isDev && serve(),

		// Watch the `docs` directory and refresh the
		// browser on changes when not in production
		isDev &&
			livereload({
				watch: "docs/bundle.js",
				delay: 200,
			}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		!isDev && terser(),
	],
	watch: {
		clearScreen: false,
	},
};
// {
// 	input: "src/App.svelte",
// 	output: {
// 		sourcemap: false,
// 		format: "cjs",
// 		name: "app",
// 		file: "docs/Add.js",
// 	},
// 	plugins: [
// 		svelte({
// 			generate: "ssr",
// 		}),
// 		resolve(),
// 		commonjs(),
// 		!isDev && terser(),
// 	],
// },

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
					stdio: ["ignore", "inherit", "inherit"],
					shell: true,
				});
			}
		},
	};
}
