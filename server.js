const app = require('express')();
const { PORT } = require('./constants');
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('SEND_MESSAGE', (data) => {
        io.emit('MESSAGE', data)
    });
});