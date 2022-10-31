import React from "react";

import Ribbon from "../components/Ribbon";
import { getSignedInUser } from '../data/Users';

export default function (props) {
    const { user } = props;

    return (
        <Ribbon user={user}/>
    );
}

export async function getServerSideProps(context) {
    const user = await getSignedInUser(context.req);
    
    return {
        props: {
            user
        },
    };
}
