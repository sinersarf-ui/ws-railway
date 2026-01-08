import http from "http";
import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 3000;

// HTTP server biasa (WAJIB)
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("WSS Koyeb aktif");
});

// WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  console.log("Client connected:", req.socket.remoteAddress);

  ws.send("Halo dari WSS Koyeb!");

  ws.on("message", (msg) => {
    console.log("Pesan:", msg.toString());
    ws.send(`Echo: ${msg}`);
  });

  ws.on("close", () => {
    console.log("Client disconnect");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
