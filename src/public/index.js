console.log("javascript funcionando");

const socketCliente = io();
let user;
Swal.fire({
  title: "hola usuario",
  text: "bienvenido, ingresa tu usuario",
  input: "text",
  allowOutsideClick: "false",
}).then((respuesta) => {
  user = respuesta.value;
});

const campo = document.getElementById("messageField");
const container = document.getElementById("messageContainer");

campo.addEventListener("keydown", (evt) => {
  console.log(evt.key);
  if (evt.key === "Enter") {
    socketCliente.emit("message", { username: user, message: campo.value });
  }
});

socketCliente.on("historico", (data) => {
  let elementos = "";
  data.forEach((item) => {
    elementos =
      elementos += `<h3>${item.username} : <span> ${item.message}</span></h3>`;
    container.innerHTML = elementos;
  });
});
socketCliente.on("newUser", () => {
  Swal.fire({
    text: "Nuevo usuario Conectado",
    toast: "true",
  });
});
