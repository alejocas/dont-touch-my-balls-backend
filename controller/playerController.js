const { BROADCAST_EVENTS } = require('../constants');
const { io } = require('./controllerOrchestrator');
const { players } = require('../data/playerDao')
const { PLAYER_ADDITION } = BROADCAST_EVENTS;

function addPlayer({ name }) {
    let connected = true;
    const responseObject = {
        connected
    };
    try {
        players[name] // Trying to generate an exception, if not, then player exists
        responseObject['connected'] = false;
        responseObject['error'] = {
            code: 1,
            message: `El nombre ${name} ya ha sido seleccionado`
        };
    } catch (error) {
        players[name] = {
            score: 10
        };
    } finally {
        io.emit(PLAYER_ADDITION, responseObject);
    }
}

module.exports = {
    addPlayer
}