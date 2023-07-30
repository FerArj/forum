let io; // Defina uma variável para armazenar o objeto io

function configureSocketIO(socketIO) {
  io = socketIO; 
}

function getIO() {
  return io;
}

export { configureSocketIO, getIO };
