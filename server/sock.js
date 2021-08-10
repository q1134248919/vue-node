const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 80 });

server.on("open", function open() {
  console.log("connected");
});

server.on("close", function close() {
  console.log("disconnected");
});

server.on("connection", function connection(ws, req) {
  // 发送欢迎信息给客户端
  ws.on("message", function incoming(message) {
    // 广播消息给所有客户端
    server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        const Nmessage = JSON.parse(message);
        if (!Nmessage.msg) {
          client.send(
            JSON.stringify({
              msg: "welcom" + Nmessage.name,
              id: Math.random * 10000000 + 100
            })
          );
        } else {
          console.log("他这里");
          client.send(
            JSON.stringify({ ...Nmessage, id: Math.random() * 10000000 + 100 })
          );
        }
      }
    });
  });
});
