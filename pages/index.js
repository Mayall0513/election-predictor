import React from "react";

import getUser from "../utils/getUser";

import Ribbon from "../components/Ribbon";

export default function (props) {
    const { user } = props;

    return (
        <Ribbon user={user}/>
    );
}

export async function getServerSideProps(context) {
    const user = await getUser(context);

    return {
        props: {
            user,
        },
    };
}
