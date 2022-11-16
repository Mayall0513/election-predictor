import databasePool from "../../../data/Database";

const winners = {
    5: true,   // Tina Kotek             - OR Governor
    7: true,   // Gavin Newsom           - CA Governor
    10: true,  // Joe Lombardo           - NV Governor
    14: true,  // Katie Hobbs            - AZ Governor
    16: true,  // Brad Little            - ID Governor
    19: true,  // Mark Gordon            - WY Governor
    22: true,  // Jared Polis            - CO Governor
    25: true,  // Michelle Lujan Grisham - NM Governor
    28: true,  // Kristi Noem            - SD Governor
    31: true,  // Jim Pillen             - NE Governor
    34: true,  // Laura Kelly            - KS Governor
    37: true,  // Kevin Stitt            - OK Governor
    40: true,  // Greg Abbott            - TX Governor
    43: true,  // Tim Walz               - MN Governor
    46: true,  // Kim Reynolds           - IA Governor
    49: true,  // Sarah Huckabee Sanders - AR Governor
    52: true,  // Tony Evers             - WI Governor
    55: true,  // Jay Robert Pritzker    - IL Governor
    58: true,  // Bill Lee               - TN Governor
    61: true,  // Kay Ivey               - AL Governor
    64: true,  // Brian Kemp             - GA Governor
    67: true,  // Ron DeSantis           - FL Governor
    70: true,  // Henry McMaster         - SC Governor
    73: true,  // Getchem Whitmer        - MI Governor
    76: true,  // Mike DeWine            - OH Governor
    79: true,  // Josh Shapiro           - PA Governor
    82: true,  // Wes Moore              - MD Governor
    85: true,  // Kathy Hochul           - NY Governor
    88: true,  // Phil Scott             - VT Governor
    91: true,  // Edward Lamont          - CT Governor
    94: true,  // Chris Sununu           - NH Governor
    97: true,  // Daniel McKee           - RI Governor
    100: true, // Maura Healey           - MA Governor
    103: true, // Janet Mills            - ME Governor
    106: true, // Mike Dunleavy          - AK Governor
    111: true, // Josh Green             - HI Governor
    114: true, // Patty Murray           - WA Senator
    117: true, // Ron Wyden              - OR Senator
    120: true, // Alex Padilla           - CA Senator
    124: true, // Catherine Cortez Masto - NV Senator
    126: true, // Mark Kelly             - AZ Senator
    129: true, // Mike Lee               - UT Senator
    132: true, // Mike Crapo             - ID Senator
    135: true, // Michael Bennett        - CO Senator
    138: true, // John Hoeven            - ND Senator
    141: true, // John Thune             - SD Senator
    144: true, // Jerry Moran            - KS Senator
    147: true, // James Lankford         - OK Senator (1)
    150: true, // Markwayne Mullin       - OK Senator (2)
    153: true, // Chuck Grassley         - IA Senator
    156: true, // Eric Schmitt           - MO Senator
    159: true, // John Boozman           - AR Senator
    162: true, // John Kennedy           - LA Senator
    169: true, // Ron Johnson            - WI Senator
    172: true, // Tammy Duckworth        - IL Senator
    175: true, // Todd Young             - IN Senator
    178: true, // Rand Paul              - KY Senator
    181: true, // Katie Britt            - AL Senator
    185: true, // Raphael Warnock        - GA Senator
    187: true, // Marco Rubio            - FL Senator
    190: true, // Tim Scott              - SC Senator
    193: true, // Ted Budd               - NC Senator
    196: true, // J.D. Vance             - OH Senator
    200: true, // John Fetterman         - PA Senator
    202: true, // Chris Van Hollen       - MD Senator
    205: true, // Chuck Schumer          - NY Senator
    208: true, // Peter Welch            - VT Senator
    211: true, // Richard Blumenthal     - CT Senator
    214: true, // Maggie Hassan          - NH Senator
    222: true  // Brian Schatz           - HI Senator
};

export default async (req, res) => {
    const betsResponse = await databasePool.query(`
        select 
            bets.race_id,
            bets.user_id,
            bets.bet_amount, 
            races.state_id,
            races.race_type
        from 
            bets
        left join 
            races
        on 
            bets.race_id = races.race_id
    `);

    const states = {};

    for (const betsRow of betsResponse.rows) {
        const { race_id, user_id, bet_amount, state_id, race_type } = betsRow;

        if (!states[state_id]) {
            states[state_id] = {
                total: 0,
                race_types: {}
            };
        }

        if (!states[state_id].race_types[race_type]) {
            states[state_id].race_types[race_type] = {
                total: 0,
                races: {}
            };
        }

        if (!states[state_id].race_types[race_type].races[race_id]) {
            states[state_id].race_types[race_type].races[race_id] = {
                betters: {},
                total: 0,
                won: winners[race_id]
            };
        }

        if (!states[state_id].race_types[race_type].races[race_id].betters[user_id]) {
            states[state_id].race_types[race_type].races[race_id].betters[user_id] = 0;
        }

        const betAmountInt = parseInt(bet_amount);

        states[state_id].race_types[race_type].total += betAmountInt;
        states[state_id].race_types[race_type].races[race_id].total += betAmountInt;
        states[state_id].race_types[race_type].races[race_id].betters[user_id] += betAmountInt;
    }

    const users = {};
    for (const stateId in states) {
        const state = states[stateId];

        for (const raceTypeId in state.race_types) {
            const raceType = state.race_types[raceTypeId];

            for (const raceId in raceType.races) {
                const race = raceType.races[raceId];
                const oddsMultiplier = 1 / (race.total / raceType.total);
                
                if (raceId == 37) {
                    console.log(stateId + " " + state);
                }
    
                for (const betterId in race.betters) {
                    const wager = race.betters[betterId];
    
                    if (!users[betterId]) {
                        users[betterId] = 0;
                    }
    
                    users[betterId] -= wager;
                    if (race.won) {
                        console.log(race.won + " " + raceId + " " + oddsMultiplier);
                        users[betterId] += wager * oddsMultiplier;
                    }  
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

    let returnString = 'user_id,user_mention,winnings\n';
    for (const { id, winnings } of usersSort.sort((x, y) => y.winnings - x.winnings)) {
        returnString += `${id},<@${id}>,${winnings}\n`;
    }

    res.setHeader("Content-Type", "text/csv"); 
    res.status(200).send(returnString);
}

export const config = {
    api: {
        bodyParser: false
    }
}