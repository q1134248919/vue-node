var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(80);
// server.listen(3900);express4 no more need http

io.on("connection", function(socket) {
  console.log("1");
  socket.on("join", name => {
    socket.nickname = name;
    console.log("joinkname:" + name);
    // console.log(socket.broadcast.RequestHeaders);
    socket.broadcast.emit("announcement", name + "join the chat");
    // socket.emit('announcement',name+'join the chat');
  });
  console.log("someone connected");
  socket.on("text", function(msg) {
    console.log("text message:" + msg);
    console.log("nickname:" + socket.nickname);
    socket.broadcast.emit("text", socket.nickname, msg); //注意比较broadcast与不加broadcast的区别
    // socket.emit('text',socket.nickname, msg);
  });
});
