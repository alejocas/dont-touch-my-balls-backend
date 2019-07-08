const { BROADCAST_EVENTS, RECEPTION_EVENTS } = require('../constants');
const { addPlayer, getPlayerList } = require('./playerController');
const { captureAttempt } = require('./gameController');

const { CAPTURE_RESULT, LOG_INFO, PLAYER_ADDITION, PLAYER_LIST, PLAYER_UPDATE_SCORE } = BROADCAST_EVENTS;
const { CAPTURE_ATTEMPT, PLAYER_CONNECTION } = RECEPTION_EVENTS;

function orchest(socket) {
    console.log(socket.id);
    socket.on(PLAYER_CONNECTION, (data) => {
        socket.emit(PLAYER_ADDITION, addPlayer(data));
        socket.emit(PLAYER_LIST, getPlayerList());
    });
    socket.on(CAPTURE_ATTEMPT, (data) => {
        const answer = captureAttempt(data);
        socket.emit(CAPTURE_RESULT, answer.CAPTURE_RESULT);
        socket.emit(LOG_INFO, answer.LOG_INFO);
        socket.emit(PLAYER_UPDATE_SCORE, answer.PLAYER_UPDATE_SCORE);
    });
}

module.exports = {
    orchest
}