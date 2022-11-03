import databasePool from "../../../data/Database";

const winners = {
};

export default async (req, res) => {
    const betsResponse = await databasePool.query(`
        select 
            bets.race_id,
            bets.user_id,
            bets.bet_amount, 
            races.state_id
        from 
            bets
        left join 
            races
        on 
            bets.race_id = races.race_id
    `);

    const states = {};

    for (const betsRow of betsResponse.rows) {
        const { race_id, user_id, bet_amount, state_id } = betsRow;

        if (!states[state_id]) {
            states[state_id] = {
                total: 0,
                races: {}
            };
        }

        if (!states[state_id].races[race_id]) {
            states[state_id].races[race_id] = {
                total: 0,
                betters: {},
                won: winners[race_id]
            };
        }

        if (!states[state_id].races[race_id][user_id]) {
            states[state_id].races[race_id].betters[user_id] = [];
        }

        const betAmountInt = parseInt(bet_amount);
        states[state_id].total += betAmountInt;
        states[state_id].races[race_id].total += betAmountInt;
        states[state_id].races[race_id].betters[user_id].push(betAmountInt);
    }

    const users = {};
    for (const stateId in states) {
        const state = states[stateId];

        for (const raceId in state.races) {
            const race = state.races[raceId];
            const oddsMultiplier = 1 / (race.total / state.total);

            for (const betterId in race.betters) {
                const wager = race.betters[betterId];

                if (!users[betterId]) {
                    users[betterId] = 0;
                }

                users[betterId] -= wager;
                if (race.won) {
                    users[betterId] += wager * oddsMultiplier;
                }  
            }
        }   
    }
    
    const usersSort = [];
    for (const userId in users) {
        usersSort.push({
            id: userId,
            winnings: Math.floor(users[userId])
        });
    }

    let returnString = 'user_id,winnings\n';
    for (const { id, winnings } of usersSort.sort((x, y) => y.winnings - x.winnings)) {
        returnString += `${id},${winnings}\n`;
    }

    res.status(200).send(returnString);
}

export const config = {
    api: {
        bodyParser: false
    }
}