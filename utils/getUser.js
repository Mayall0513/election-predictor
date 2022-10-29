import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export default function getUser(context) {
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

        return { id: jwtContents.id, username: jwtContents.username, avatar: jwtContents.avatar };
    }

    catch {
        return null;
    }
}