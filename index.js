//Server config
const express = require('express');
const { resolve } = require('path');
const app = express();
const port = 3010;
const http = require('http');
const server = http.createServer(app);

//Start socket
const { Server } = require("socket.io");
const io = new Server(server);

//Setando pasta de arquivos estatics
app.use(express.static('static'));

const conn = io.of('/chat');

conn.on('connection', (socket) => {
  //recebendo e enviando a mensagem
  socket.on('chatMessage', (data) => {
    console.log('Recebi informações:', data);
    socket.emit('retMsg', data);
  })

});


//Apontando rotas
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
app.get('/chat', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/chatbox.html'));
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});