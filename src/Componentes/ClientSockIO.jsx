import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3010');

function PruebaFunc(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('PruebaFunc', 1000);
}

export { PruebaFunc };