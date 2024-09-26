const app = require("express")();

const gridState = {},
  connected = [];

const server = app.listen(8080, () => {
  console.log("Server is up and running!");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      gridState[`${row}-${col}`] = null;
    }
  }
});

const io = require("socket.io")(server, {
  perMessageDeflate: false,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  connected.push(socket.id);
  io.emit("current-state", gridState);

  io.emit("online-users", connected);
  socket.on("cell-selected", (data) => {
    const { row, col, unicodeCharacter } = data;
    const blockId = `${row}-${col}`;

    const regex = /\p{Any}/gu;
    if (!gridState[blockId] && regex.test(unicodeCharacter)) {
      gridState[blockId] = unicodeCharacter;
      io.emit("current-state", gridState);
    }
  });

  socket.on("disconnect", () => {
    connected.pop(socket.id);
    io.emit("online-users", connected);
  });
});
