const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.render('index.ejs');
});

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});

io.on('connection', (socket) => {
   socket.on ( 'stop' , (username) => {
      io.emit ( 'stop' , username );
   });
   socket.on ( 'start' , (username) => {
      io.emit ( 'start' , username );
   });
});
