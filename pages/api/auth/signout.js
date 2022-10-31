import cookie from 'cookie';

export default (req, res) => {
    res.setHeader('Set-Cookie',
        cookie.serialize(process.env.AUTH_COOKIE_NAME, '', 
            {
                maxAge: 0,
                path: '/'
            }
        )
    );

    res.status(200).redirect("/");
}

export const config = {
    api: {
        bodyParser: false,
    }
}