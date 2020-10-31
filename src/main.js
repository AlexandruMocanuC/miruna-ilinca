import App from "./App.svelte";

const app = new App({
	target: document.getElementById("app-root"),

	hydrate: true,
	props: {
		name: "temp",
	},
});

export default app;
