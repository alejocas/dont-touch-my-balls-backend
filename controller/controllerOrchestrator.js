const { server } = require('../app');
const { ioLib } = require('../libraries');
const { RECEPTION_EVENTS } = require('../constants');
const { addPlayer } = require('./playerController');
const io = ioLib(server);

const { CAPTURE_ATTEMPT, PLAYER_CONNECTION } = RECEPTION_EVENTS;

function orchest(socket) {
    console.log(socket.id);
    socket.on(PLAYER_CONNECTION, addPlayer);
    socket.on(CAPTURE_ATTEMPT)
}

io.on('connection', orchest);