import cookie from 'cookie';

export default function(req, res) {
    res.setHeader('Set-Cookie',
        cookie.serialize(process.env.AUTH_COOKIE_NAME, '', 
            {
                maxAge: 0,
                path: '/'
            }
        )
    );

    res.redirect("/api/auth");
}