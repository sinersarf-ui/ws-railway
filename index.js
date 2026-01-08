import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import httpProxy from "http-proxy";

const PORT = process.env.PORT || 8000;

// HTTP server (WAJIB di Koyeb)
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("WS Proxy is running\n");
});

// WebSocket Server
const wss = new WebSocketServer({ server });

// Proxy target (contoh)
const proxy = httpProxy.createProxyServer({
  target: "wss://echo.websocket.events",
  ws: true,
  secure: true
});

wss.on("connection", (client, req) => {
  console.log("Client connected");

  const targetSocket = new WebSocket("wss://echo.websocket.events");

  client.on("message", (msg) => {
    targetSocket.send(msg);
  });

  targetSocket.on("message", (msg) => {
    client.send(msg);
  });

  client.on("close", () => {
    targetSocket.close();
  });
});

server.listen(PORT, () => {
  console.log("running wsProxy running...");
});
