
const http = require('http');
const Mini = require('./Mini');

const config = require('./app/config');

const mini = new Mini(config);
const server = http.createServer(mini.onRequest);

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(config.http.port, (a) => {
    console.log('Listening http://localhost:' + config.http.port);
});
