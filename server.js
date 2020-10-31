const { createServer } = require("http");
const app = require("./docs/App.js");

createServer((req, res) => {
	const { html } = app.render({ url: req.url });

	res.write(`
    <div id="app-root">${html}</div>
    <script src="/docs/bundle.js"></script>
  `);

	res.end();
}).listen(3000);
