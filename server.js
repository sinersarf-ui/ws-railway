const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT });

console.log("WSS running on port", PORT);

wss.on("connection", (ws, req) => {
  console.log("Client connected");

  ws.send("WSS Connected");

  ws.on("message", (msg) => {
    console.log("Received:", msg.toString());
    ws.send("Echo: " + msg);
  });
});
