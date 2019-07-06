const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/web/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(PORT, () => {
    console.log(`Listening on *:${PORT}`);
})