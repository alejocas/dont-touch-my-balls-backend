const { players } = require('../data/playerDao');

function addPlayer({ name }) {
    let connected = true;
    for (const player in players) {
        if (player === name) {
            connected = false;
        }
    }
    let responseObject = {}
    if (connected) {
        players[name] = {
            score: 10
        }
        responseObject = {
            connected
        }
    } else {
        responseObject = {
            connected,
            error: {
                code: 1,
                message: `El nombre ${name} ya ha sido seleccionado`
            }
        }
    }
    return responseObject;
}

module.exports = {
    addPlayer
}