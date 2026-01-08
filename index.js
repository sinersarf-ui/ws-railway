const http = require("http");
const WebSocket = require("ws");
const httpProxy = require("http-proxy");

const PORT = 3000;

// Proxy target (contoh)
const TARGET = "ws://example.com:8080";

const proxy = httpProxy.createProxyServer({
  target: TARGET,
  ws: true,
  changeOrigin: true,
});

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("WSS Proxy Running");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (client, req) => {
  console.log("Client connected");

  client.on("message", (message) => {
    console.log("Message:", message.toString());
  });

  client.on("close", () => {
    console.log("Client disconnected");
  });
});

// Handle WebSocket upgrade
server.on("upgrade", (req, socket, head) => {
  proxy.ws(req, socket, head);
});

server.listen(PORT, () => {
  console.log(`WSS Proxy running on port ${PORT}`);
});
