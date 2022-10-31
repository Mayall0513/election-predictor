import databasePool from "./Database";

const getRaces = async (raceType) => {
  const response = await databasePool.query(
    `
      SELECT 
        race_id, 
        race_index, 
        state_id, 
        candidate_name, 
        candidate_party, 
        incumbent 
      FROM races 
      WHERE race_type=${raceType}
    `
  );

  const returnArray = {};
  
  for (const row of response.rows) {
    const { race_id, race_index, state_id, candidate_name, candidate_party, incumbent } = row;
    const betTotals = await getRaceBetTotals(raceType, race_index, state_id);

    if (!returnArray[state_id]) {
      returnArray[state_id] = {
        races: []
      };
    }

    if (!returnArray[state_id]['races'][race_index]) {
      returnArray[state_id]['races'][race_index] = {
        stateId: state_id,
        raceType,
        raceIndex: race_index,
        candidates: []
      };
    }

    const newCandidate = { 
      name: candidate_name, 
      party: candidate_party, 
      incumbent,
      raceId: race_id,
      odds: Math.floor(betTotals[race_id] * 10) / 10
    };

    if (candidate_party === "oth") {
      delete newCandidate.party;
    }

    returnArray[state_id]['races'][race_index].candidates.push(newCandidate);
  }

  return returnArray;
}

const getRaceBetTotals = async (raceType, raceIndex, stateId) => {
  const betTotals = {};

  const relevantRaces = await databasePool.query(`
    select 
      race_id
    from 
      races 
    where 
      races.race_type=${raceType} and 
      races.race_index=${raceIndex} and 
      races.state_id='${stateId}'
  `);

  for (const relevantRace of relevantRaces.rows) {
    betTotals[relevantRace.race_id] = 0;
  }

  const relevantBets = await databasePool.query(`
    select 
      bets.race_id,
      bets.bet_amount
    from 
      races
    right join bets
      on races.race_id = bets.race_id 
    where 
      races.race_type=${raceType} and 
      races.race_index=${raceIndex} and 
      races.state_id='${stateId}'
  `);

  for (const relevantBet of relevantBets.rows) {
    betTotals[relevantBet.race_id] += parseInt(relevantBet.bet_amount);
  }

  let betTotal = 0;
  for (const raceId in betTotals) {
    betTotal += betTotals[raceId];
  }

  for (const raceId in betTotals) {
    if (betTotal === 0) {
      betTotals[raceId] = (1 / Object.keys(betTotals).length) * 100
    }

    else {
      betTotals[raceId] = Math.max(betTotals[raceId] / betTotal) * 100
    }
  }

  return betTotals;
};

export {
  getRaces,
  getRaceBetTotals
};