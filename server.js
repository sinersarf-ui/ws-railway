const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT });

console.log("WebSocket running on port", PORT);

wss.on("connection", (ws) => {
  ws.send("WSS Connected");

  ws.on("message", msg => {
    ws.send("Echo: " + msg);
  });
});
