const app = require("express")();

const gridState = {},
  connected = [];

const gridSnapshots = new Map();

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

function recordOrUpdateGridSnapshot(timestamp, update) {
  console.log(gridSnapshots);
  if (gridSnapshots.has(timestamp)) {
    const existingSnapshot = gridSnapshots.get(timestamp);

    existingSnapshot.updates.push(update);

    existingSnapshot.grid = JSON.parse(JSON.stringify(gridState));
  } else {
    gridSnapshots.set(timestamp, {
      grid: JSON.parse(JSON.stringify(gridState)),
      updates: [update],
    });
  }
}

io.on("connection", (socket) => {
  connected.push(socket.id);
  io.emit("initial-state", gridState);

  io.emit("online-users", connected);
  socket.on("cell-selected", (data) => {
    const { row, col, unicodeCharacter } = data;
    const blockId = `${row}-${col}`;

    const regex = /\p{Any}/gu;
    if (!gridState[blockId] && regex.test(unicodeCharacter)) {
      gridState[blockId] = unicodeCharacter;

      io.emit("current-state", { row, col, unicodeCharacter });

      const currentTimestamp = new Date().toISOString().slice(0, 19);
      const update = { row, col, unicodeCharacter, id: socket.id };

      recordOrUpdateGridSnapshot(currentTimestamp, update);
    }
  });

  socket.on("disconnect", () => {
    connected.pop(socket.id);
    io.emit("online-users", connected);
  });
});
