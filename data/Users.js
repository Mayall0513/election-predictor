import databasePool from "./Database";

import axios from 'axios';

import jwt from 'jsonwebtoken';

const pageSize = 1000;

const getUserXp = async (userId, oldAccount) => {
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
      0 : //await cacheUserXp(userId) : 
      userRows.rows[0].experience);

    // 255 xp is level 3
    // 3720 xp is level 10
    return Math.max(
      Math.min(
        userXp, // actual user xp
        oldAccount ? // if they have an "old" account they get a floor of 240, otherwise there is no floor
          240 : 
          0
        ), 
      4000 // ceiling
    ) - xpWagered; //subtract the xp they've already used
};

/*
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
*/

const getSignedInUser = async (req) => {
  if (req.cookies[process.env.AUTH_COOKIE_NAME]) {
    try {
        const { id, username, avatar, old, discriminator } = jwt.verify(req.cookies[process.env.AUTH_COOKIE_NAME], process.env.JWT_SECRET);
        const xp = await getUserXp(id, old);

        return { 
          id, 
          username, 
          avatar,
          xp,
          discriminator
        };
    }
    
    catch(error) {  }
  }

  return null;
}

getUserXp(0, true);

export {
    getUserXp,
    getSignedInUser
};