import { URLSearchParams } from 'url';

import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import axios from 'axios';

const tokenConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const accountAgeMinimum = new Date('2022/11/01 23:59:59');

export default async (req, res) => {
    if (req.query.code) {
        try {
            const searchParams = new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: req.query.code,
                redirect_uri: process.env.FRONTEND_URI + "/api/auth/signin",
                scope: 'identify guilds'
            });
    
            const tokenResponse = await axios.post(process.env.DISCORD_API_URI + "/oauth2/token", searchParams.toString(), tokenConfig);
            const { token_type, access_token } = tokenResponse.data;

            const userConfig = {
                headers: {
                    'Authorization': `${token_type} ${access_token}`
                }
            };

            const guildsResponse = await axios.get(process.env.DISCORD_API_URI + "/users/@me/guilds", userConfig);
            const guilds = guildsResponse.data;
            if (!guilds.some(guild => guild.id == process.env.SERVER_ID)) {
                /**
                 * User must be in the specific guild!
                 * TODO: tell them that this is what happened?
                 */
                return res.status(400).redirect(process.env.FRONTEND_URI);
            }

            const userResponse = await axios.get(process.env.DISCORD_API_URI + "/users/@me", userConfig);
            const { id , username, avatar } = userResponse.data;

            const timestampNum = parseInt(BigInt(id) >> 22n) + 1_420_070_400_000;
            const timestampDate = new Date(timestampNum);

            const token = jwt.sign(
                { 
                    id, 
                    username, 
                    avatar, 
                    old: timestampDate < accountAgeMinimum 
                },
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

        catch(error) { }
    }

    return res.status(200).redirect(`https://discord.com/oauth2/authorize?response_type=code&scope=identify%20guilds&client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.FRONTEND_URI}/api/auth/signin`);
};

export const config = {
    api: {
        bodyParser: false,
    }
};