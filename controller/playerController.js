const { players } = require('../data/playerDao');

function addPlayer({ name }) {
    let connected = true;
    for (const player in players) {
        if (player === name) {
            connected = false;
        }
    }
    const responseObject = connected ? {
        connected
    } : {
        connected,
        error: {
            code: 1,
            message: `El nombre ${name} ya ha sido seleccionado`
        }
    }
    return responseObject;
}

module.exports = {
    addPlayer
}