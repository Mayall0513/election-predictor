import databasePool from "./Database";

import axios from 'axios';

import jwt from 'jsonwebtoken';

const pageSize = 1000;

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
    
    return parseInt(userRows.rows.length === 0 ?
        await cacheUserXp(userId) :
        userRows.rows[0].experience
    ) - xpWagered;
};

const cacheUserXp = async (userId) => {
    let page = 0;

    while (true) {
      const users = await axios.get(`${process.env.MEE6_ENDPOINT}/${process.env.SERVER_ID}?limit=${pageSize}&page=${page}`);
  
      let experience = null;
      let query = ``;
  
      for (const user of users.data.players) {
        query += `
          insert into 
            users
            (
              user_id,
              experience
            )
          values
            (
              ${user.id},
              ${user.xp}
            )
          on conflict(user_id) do update
            set experience=${user.xp};
        `;
  
        if (user.id == userId) {
          experience = user.xp;
        }
      }
  
      await databasePool.query(query);
      if (experience) {
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