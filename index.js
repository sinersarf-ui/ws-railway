import http from "http";
import net from "net";
import WebSocket, { WebSocketServer } from "ws";

const server = http.createServer();
const wss = new WebSocketServer({ server });

function decodeBase64Path(path) {
  try {
    return Buffer.from(path, "base64").toString();
  } catch {
    return null;
  }
}

wss.on("connection", (ws, req) => {
  const path = req.url.replace("/", "");
  const decoded = decodeBase64Path(path);

  if (!decoded || !decoded.includes(":")) {
    ws.close();
    return;
  }

  const [host, port] = decoded.split(":");

  const socket = net.connect(port, host, () => {
    ws.on("message", (msg) => socket.write(msg));
    socket.on("data", (data) => ws.send(data));
  });

  socket.on("close", () => ws.close());
  socket.on("error", () => ws.close());
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("WSS Proxy running on port", PORT);
});
