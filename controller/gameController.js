const { players } = require('../data/playerDao');

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
    const responseObject = {
        CAPTURE_RESULT: {
            attacker: {
                earnedPoints: pointsAtStake
            },
            attacked: {
                lostPoints: pointsAtStake
            }
        },
        LOG_INFO: {
            message: battleInfo
        },
        PLAYER_UPDATE_SCORE: {
            scoreList: globalScoreList
        }
    };
    return responseObject;
}

module.exports = {
    captureAttempt
}