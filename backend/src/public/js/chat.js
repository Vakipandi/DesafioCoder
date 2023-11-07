const socketClient = io();
const userName = document.getElementById("username");
const form = document.getElementById("form");
const inputMessage = document.getElementById("message");
const chat = document.getElementById("chat");

let user = null;

if (!user) {
  Swal.fire({
    title: "Welcome to Chat",
    text: "Enter your name",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "You need to enter your name to be continue";
      }
    },
  }).then((username) => {
    user = username.value;
    userName.innerHTML = user;
    socketClient.emit("newUser", user);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const info = {
    user: user,
    message: inputMessage.value,
  };
  console.log(info);
  socketClient.emit("message", info);
  inputMessage.value = "";
};

socketClient.on("chat", (msg) => {
  const chatrender = msg
    .map((e) => {
      return `<p><strong>${e.user}</strong>${e.message}`;
    })
    .join(" ");
  chat.innerHTML = chatrender;
});

socketClient.on("broadcast", (usr) => {
    Toastify({
        text: `${usr} has joined the chat`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }}.showToast()
    )
})