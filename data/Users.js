import databasePool from "./Database";

import axios from 'axios';

import jwt from 'jsonwebtoken';

const maximumLevel = 100;
const levels = [];

{
  let runningXp = 0;

  for (let i = 0; i < maximumLevel; i++) {
    levels[i] = runningXp;
    runningXp += 5 * (i * i) + (50 * i) + 100;
  }
}


const pageSize = 1000;
const maximumXp = levels[14];

const getUserXp = async (userId) => {
    const userRows = await databasePool.query(`
        select experience
        from users 
        where user_id=${userId}
    `);

    const userBets = await databasePool.query(`
        select bet_amount
        from bets 
        where user_id=${userId}
    `);

    let xpWagered = 0;
    for (const userbet of userBets.rows) {
      xpWagered += parseInt(userbet.bet_amount);
    }
    
    const userXp = parseInt(userRows.rows.length === 0 ? 
      await cacheUserXp(userId) : 
      userRows.rows[0].experience);

    return Math.min(userXp, maximumXp) - xpWagered;
};

const cacheUserXp = async (userId) => {
    let page = 0;

    while (true) {
      const usersResponse = await axios.get(`${process.env.MEE6_ENDPOINT}/${process.env.SERVER_ID}?limit=${pageSize}&page=${page}`);
      const { players } = usersResponse.data;

      let experience = null;
      let query = '';

      if (players.length === 0) {
        query += `
          insert into 
            users
            (
              user_id,
              experience
            )
          values
            (
              ${userId},
              0
            )
          on conflict(user_id) do update
            set experience=0;
        `
        experience = 0;
      }
  
      for (const user of players) {
        const { id, xp } = user;
        
        query += `
          insert into 
            users
            (
              user_id,
              experience
            )
          values
            (
              ${id},
              ${xp}
            )
          on conflict(user_id) do update
            set experience=${xp};
        `;
  
        if (id == userId) {
          experience = xp;
        }
      }
  
      await databasePool.query(query);
      if (experience !== null) {
        return experience;
      }
  
      page++;
    }
}

const getSignedInUser = async (req) => {
  if (req.cookies[process.env.AUTH_COOKIE_NAME]) {
    try {
        const { id, username, avatar } = jwt.verify(req.cookies[process.env.AUTH_COOKIE_NAME], process.env.JWT_SECRET);
        const xp = await getUserXp(id);

        return { 
          id, 
          username, 
          avatar,
          xp
        };
    }
    
    catch(error) {  }
  }

  return null;
}

export {
    getUserXp,
    getSignedInUser
};