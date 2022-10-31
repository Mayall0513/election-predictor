import { URLSearchParams } from 'url';

import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import axios from 'axios';

const tokenConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

export default async (req, res) => {
    if (req.query.code) {
        try {
            const body = new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: req.query.code,
                redirect_uri: process.env.FRONTEND_URI + "/api/auth/signin",
                scope: 'identify'
            });
    
            const tokenResponse = await axios.post(process.env.DISCORD_API_URI + "/oauth2/token", body.toString(), tokenConfig);
    
            const userConfig = {
                headers: {
                    'Authorization': `${tokenResponse.data.token_type} ${tokenResponse.data.access_token}`
                }
            };

            const userResponse = await axios.get(process.env.DISCORD_API_URI + "/users/@me", userConfig);
    
            const jwtContents = { 
                id: userResponse.data.id, 
                username: userResponse.data.username, 
                avatar: userResponse.data.avatar 
            };
    
            const token = jwt.sign(
                jwtContents,
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
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

            return res.status(200).redirect(process.env.FRONTEND_URI);
        }

        catch(error) {  }
    }

    return res.status(200).redirect(`https://discord.com/oauth2/authorize?response_type=code&scope=identify&client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.FRONTEND_URI}/api/auth/signin`);
};

export const config = {
    api: {
        bodyParser: false,
    }
};