const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');

// Load the Next.js app
const next = require('next');
const app = next({
  dev: false,
  dir: path.join(__dirname),
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
