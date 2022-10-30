import { URLSearchParams } from 'url';

import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import axios from 'axios';

export default async function(req, res) {
    if (!req.query.code) {
        return res.redirect(`https://discord.com/oauth2/authorize?response_type=code&scope=identify&client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.FRONTEND_URI + "/api/auth"}`);
    }

    try {
        const body = new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri: process.env.FRONTEND_URI + "/api/auth",
            scope: 'identify'
        });

        const authoriseResponse = await axios.post(process.env.DISCORD_API_URI + "/oauth2/token", body.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const userResponse = await axios.get(process.env.DISCORD_API_URI + "/users/@me",
            {
                headers: {
                    'Authorization': `${authoriseResponse.data.token_type} ${authoriseResponse.data.access_token}`
                }
            }
        );

        const jwtContents = { 
            id: userResponse.data.id, 
            username: userResponse.data.username, 
            avatar: userResponse.data.avatar 
        };
    
        const token = jwt.sign(
            jwtContents,
            process.env.JWT_SECRET,
            { expiresIn: "72h" }
        );
    
        res.setHeader(
            "Set-Cookie", 
            cookie.serialize(
                process.env.AUTH_COOKIE_NAME,
                token,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV != "development",
                    sameSite: 'lax',
                    path: '/'
                }
            )
        );
    
        res.redirect("/");
    }

    catch (error) {
        res.status(500).json({ error: error.message });
    }
}