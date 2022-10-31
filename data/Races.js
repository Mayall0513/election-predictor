import databasePool from "./Database";

const getRaces = async (raceType) => {
  const response = await databasePool.query(
    `
      select 
        race_id, 
        race_index, 
        state_id, 
        candidate_name, 
        candidate_party, 
        incumbent 
      from races 
      where race_type=${raceType}
    `
  );

  const stateRaceCounts = {};
  const betTotals = await getRaceBetTotals(raceType);

  for (const row of response.rows) {
    const { state_id, race_index } = row;

    if (!stateRaceCounts[state_id]) {
      stateRaceCounts[state_id] = {};
    }

    if (!stateRaceCounts[state_id][race_index]) {
      stateRaceCounts[state_id][race_index] = 0;
    }

    stateRaceCounts[state_id][race_index]++;
  }

  const returnArray = {};

  for (const row of response.rows) {
    const { race_id, race_index, state_id, candidate_name, candidate_party, incumbent } = row;
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

    const betInfo = getCandidateBetInfo(race_id, race_index, state_id, betTotals, stateRaceCounts);

    const newCandidate = { 
      name: candidate_name, 
      party: candidate_party, 
      incumbent,
      raceId: race_id,
      totalBet: betInfo.total,
      odds: Math.floor(betInfo.percent * 1000) / 10
    };

    if (candidate_party === "oth") {
      delete newCandidate.party;
    }

    returnArray[state_id]['races'][race_index].candidates.push(newCandidate);
  }

  return returnArray;
}

const getCandidateBetInfo = (race_id, race_index, state_id, betTotals, stateRaceCounts) => {
  /**
   * This race has any bets
   */
  if (betTotals[state_id] && betTotals[state_id][race_index]) {
    const betTotal = betTotals[state_id][race_index][race_id] ? 
      parseInt(betTotals[state_id][race_index][race_id]) :
      0;

    const raceTotal = betTotals[state_id][race_index].total;

    return { total: betTotal, percent: betTotal / raceTotal };
  }

  /**
   * This race has no bets
   * Base it off the total number
   */
  else {
    return { total: 0, percent: 1 / stateRaceCounts[state_id][race_index] };
  }
}

const getRaceBetTotals = async (raceType) => {
  const betTotals = {};

  const relevantBets = await databasePool.query(`
    select 
      races.race_id,
      races.race_index,
      races.state_id,
      bets.bet_amount
    from 
      races
    right join bets
      on races.race_id = bets.race_id 
    where 
      races.race_type=${raceType}
  `);

  for (const relevantBet of relevantBets.rows) {
    const { race_id, state_id, race_index, bet_amount } = relevantBet;
    if (!betTotals[state_id]) {
      betTotals[state_id] = {};
    }

    if (!betTotals[state_id][race_index]) {
      betTotals[state_id][race_index] = { total: 0};
    }

    if (!betTotals[state_id][race_index][race_id]) {
      betTotals[state_id][race_index][race_id] = 0;
    }

    const bet_amount_int = parseInt(bet_amount);
    betTotals[state_id][race_index].total += bet_amount_int;
    betTotals[state_id][race_index][race_id] += bet_amount_int;
  }

  return betTotals;
};

export {
  getRaces,
  getRaceBetTotals
};