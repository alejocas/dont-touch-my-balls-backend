const app = require('express')();
const { PORT } = require('./constants');
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = require('socket.io')(server);
const { orchest } = require('./functions/controllerOrchestrator');

module.exports = {
    io
}

io.on('connection', orchest);