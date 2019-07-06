const { BROADCAST_EVENTS } = require('../constants');
const { io } = require('./controllerOrchestrator');
const { players } = require('../data/playerDao')
const { CAPTURE_RESULT, LOG_INFO, PLAYER_UPDATE_SCORE } = BROADCAST_EVENTS;

function captureAttempt({ attacker, attacked, successfulAttack }) {
    const successfulAttackMessage = `El jugador ${attacker} ha atacado satisfactoriamente al jugador ${attacked}`;
    const failedAttackMessage = `El jugador ${attacker} ha fallado en su ataque al jugador ${attacked}`;
    let battleInfo = failedAttackMessage;
    let pointsAtStake = 0;
    if(successfulAttack){
        battleInfo = successfulAttackMessage;
        pointsAtStake = 1;
    }
    players[attacker].score += pointsAtStake;
    players[attacked].score -= pointsAtStake;
    const globalScoreList = [];
    for (const player in players) {
        globalScoreList.push({
            name: player,
            score: players[player].score
        });
    }
    io.emit(CAPTURE_RESULT, {
        attacker: {
            earnedPoints: pointsAtStake
        },
        attacked: {
            lostPoints: pointsAtStake
        }
    });
    io.emit(LOG_INFO, {
        message: battleInfo
    });
    io.emit(PLAYER_UPDATE_SCORE, {
        scoreList: globalScoreList
    })
}

module.exports = {
    captureAttempt
}