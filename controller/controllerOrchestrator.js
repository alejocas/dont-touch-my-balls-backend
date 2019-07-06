const { server } = require('../app');
const { RECEPTION_EVENTS } = require('../constants');
const { ioLib } = require('../libraries');
const { addPlayer } = require('./playerController');
const { captureAttempt } = require('./gameController');
const io = ioLib(server);

const { CAPTURE_ATTEMPT, PLAYER_CONNECTION } = RECEPTION_EVENTS;

function orchest(socket) {
    console.log(socket.id);
    socket.on(PLAYER_CONNECTION, addPlayer);
    socket.on(CAPTURE_ATTEMPT, captureAttempt)
}

io.on('connection', orchest);

module.exports = {
    io
}