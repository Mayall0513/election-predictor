import jwt from 'jsonwebtoken';

import databasePool from "../../../data/Database";
import { getUserXp } from "../../../data/Users";

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).send();
    }

    if (!req.cookies[process.env.AUTH_COOKIE_NAME]) {
        return res.status(401).send();
    }

    const { predictions } = req.body;
    try {
        const jwtContents = jwt.verify(req.cookies[process.env.AUTH_COOKIE_NAME], process.env.JWT_SECRET);
        const experience = await getUserXp(jwtContents.id);
    
        let totalWager = 0;
        for (const race_id in predictions) {
            totalWager += predictions[race_id];
        }
    
        if (totalWager > experience) {
            return res.status(400).send();
        }
    
        for (const race_id in predictions) {
            const prediction = predictions[race_id];
            if (!prediction || prediction === '') {
                continue;
            }
    
            await databasePool.query(`
                insert into 
                public.bets 
                (
                    user_id, 
                    race_id, 
                    bet_amount
                )
                values
                (
                    ${jwtContents.id}, 
                    ${race_id}, 
                    ${prediction}
                )
            `);
        }

        res.status(201).send();
    }

    catch (error) {
        res.status(401).send();  
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        },
    }
}