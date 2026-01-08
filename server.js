const WebSocket = require("ws");

// Koyeb akan inject PORT otomatis
const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT });

console.log("WSS WebSocket running on port", PORT);

wss.on("connection", (ws, req) => {
  console.log("Client connected from", req.socket.remoteAddress);

  ws.send("Connected to WSS server");

  ws.on("message", (message) => {
    console.log("Received:", message.toString());
    ws.send("Echo: " + message);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
