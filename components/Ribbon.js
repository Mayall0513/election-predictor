import React from "react";
import { useRouter } from "next/router";

export default (props) => {
    const { user } = props;
    const router = useRouter();

    if (user) {
        return (
            <div className="ribbon">
                { user.username }
                <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}/>
            </div>
        )
    }

    else {
        return (
            <div className="ribbon">
                <button onClick={() => router.push('api/auth')}>Sign in</button>
            </div>
        );
    }
};
