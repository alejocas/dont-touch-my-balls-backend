const { BROADCAST_EVENTS, RECEPTION_EVENTS } = require('../constants');
const { addPlayer, getPlayerList } = require('./playerController');
const { captureAttempt } = require('./gameController');

const { CAPTURE_RESULT, LOG_INFO, PLAYER_ADDITION, PLAYER_LIST, PLAYER_UPDATE_SCORE } = BROADCAST_EVENTS;
const { CAPTURE_ATTEMPT, PLAYER_CONNECTION } = RECEPTION_EVENTS;

function emitEventToAll(socket, event, payload) {
    socket.emit(event, payload);
    socket.broadcast.emit(event, payload);
}

function orchest(socket) {
    console.log(socket.id);
    socket.on(CAPTURE_ATTEMPT, (data) => {
        const { captureResult, logInfo, playerUpdateScore } = captureAttempt(data);
        emitEventToAll(socket, CAPTURE_RESULT, captureResult);
        emitEventToAll(socket, LOG_INFO, logInfo);
        emitEventToAll(socket, PLAYER_UPDATE_SCORE, playerUpdateScore);
    });
    socket.on(PLAYER_CONNECTION, (data) => {
        const addPlayerResponse = addPlayer(data)
        socket.emit(PLAYER_ADDITION, addPlayerResponse);
        if (addPlayerResponse.connected) {
            const playersInGame = getPlayerList();
            const logInfoAboutPlayer = {
                message: `Usuario ${data.name} ha ingresado a la sala`
            }
            emitEventToAll(socket, PLAYER_LIST, playersInGame);
            emitEventToAll(socket, LOG_INFO, logInfoAboutPlayer);
        }
    });
}

module.exports = {
    orchest
}