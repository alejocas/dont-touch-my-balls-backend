const { RECEPTION_EVENTS } = require('../constants');
const { addPlayer } = require('./player');
const { PLAYER_CONNECTION } = RECEPTION_EVENTS;

function orchest(socket) {
    console.log(socket.id);
    socket.on(PLAYER_CONNECTION, addPlayer);
}

module.exports = {
    orchest
}