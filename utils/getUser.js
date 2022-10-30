import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export default async function getUser(context) {
    if (!context.req.headers.cookie) {
        return null;
    }

    const cookies = cookie.parse(context.req.headers.cookie)
    if (!cookies) {
        return null;
    }

    const token = cookies[process.env.AUTH_COOKIE_NAME];
    if (!token) {
        return null;
    }

    try {
        const jwtContents = jwt.verify(token, process.env.JWT_SECRET);
        if (!jwtContents) {
            return null;
        }

        const xp = await axios.get(process.env.BACKEND_URI + "/users/xp?id=" + jwtContents.id);

        return { id: jwtContents.id, username: jwtContents.username, avatar: jwtContents.avatar, xp: xp.data.experience};
    }

    catch {
        return null;
    }
}