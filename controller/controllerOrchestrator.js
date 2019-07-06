const { RECEPTION_EVENTS } = require('../constants');
const { addPlayer } = require('./playerController');

const { CAPTURE_ATTEMPT, PLAYER_CONNECTION } = RECEPTION_EVENTS;

function orchest(socket) {
    console.log(socket.id);
    socket.on(PLAYER_CONNECTION, addPlayer);
    socket.on(CAPTURE_ATTEMPT)
}

module.exports = {
    orchest
}