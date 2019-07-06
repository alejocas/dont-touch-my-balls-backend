const { BROADCAST_EVENTS } = require('../constants');
const { io } = require('../server');
const { players } = require('../data/playerDao')
const { PLAYER_ADDITION } = BROADCAST_EVENTS;

function addPlayer({ name }){
    let connected = false;
    try {
        players[name] // Trying to generate an exception, if not, then player exists
        io.emit(PLAYER_ADDITION, {
            connected: false,
            error: {
                code: 1,
                message: `El nombre ${name} ya ha sido seleccionado`
            }
        })
    } catch (error) {
        players[name] = {
            score: 10
        }
        io.emit(PLAYER_ADDITION, {
            connected: true
        });
    }
}

function updateScore(){
    
}

module.exports = {
    addPlayer
}