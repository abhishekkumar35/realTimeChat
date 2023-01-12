const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const os = require('os');


app.use(cors({origin: "http://localhost:5500", credentials: true}));
app.use(express.static(__dirname + '/'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
// const networkUrl = os.networkInterfaces().en0;

app.get('/1', (req, res) => {
    res.sendFile('./chat.html',{root:__dirname});
})
app.get('/', (req, res) => {
  res.sendFile('./chat2.html',{root:__dirname});
})
http.listen(5500, () => {
  console.log('Server listening on port 5500');
  
  const interfaces = os.networkInterfaces();
  let address;
  Object.keys(interfaces).forEach(function (ifname) {
    interfaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        return;
      }
      address = iface.address;
    });
  });
  console.log(address);
});
