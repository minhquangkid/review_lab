let io;

module.exports = {
  init: (httpserver) => {
    io = require("socket.io")(httpserver);
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized");
    }
    return io;
  },
};
