const express = require("express");

const { Server } = require("socket.io");

const app = express();
//variable de entorno port
const PORT = process.env.PORT || 8080; //asignamos a la variable PORT, para utilizar los puertos definidos en el entorno donde se ejecute. por defecto 8080.

const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//conectamos servidor de socket con el de express
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

let historicoMensajes = [];

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado", socket.id);
  socket.broadcast.emit("newUser"); //envia un mensaje a los clientes ya conectados, menos a ese cliente que se conecto
  socket.emit("historico", historicoMensajes);
  socket.on("message", (data) => {
    console.log(data);
    historicoMensajes.push(data);
    io.sockets.emit("historico", historicoMensajes);
  });
});
