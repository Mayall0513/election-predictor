import React, { useState } from "react";
import { useRouter } from "next/router";

import axios from 'axios';
import getUser from "../utils/getUser";

import PredictionPanel from "../components/PredictionPanel";
import StatesMap from "../components/StatesMap";
import Ribbon from "../components/Ribbon";

export default function (props) {
    const { user, states, defaultFocusedState, defaultFocusedRaceIndex } = props;
    const router = useRouter();

    const defaultFocusedRace = defaultFocusedState != null && defaultFocusedRaceIndex != null
        ? states[defaultFocusedState].races[defaultFocusedRaceIndex]
        : null;

    const [focusedRace, setFocusedRace] = useState({ state: defaultFocusedState, race: defaultFocusedRace });

    const onRaceSelected = (e) => {
        const { stateId, raceId } = e;

        setFocusedRace({ state: stateId, race: states[stateId].races[raceId] });
        router.push(`/governors?s=${stateId}&r=${raceId}`);
    };

    const removeSelectedState = () => {
        setFocusedRace({ state: null, race: null });
        router.push('/governors');
    };

    return (
        <>
            <Ribbon user={user}/>
            <div className="root">
                <StatesMap
                    states={states}
                    onRaceSelected={onRaceSelected}
                    focusedRace={focusedRace}
                />
               <PredictionPanel 
                    user={user}
                    title="Select a state to make a gubernatorial race prediction"
                    focusedRace={focusedRace}
                    removeSelectedState={removeSelectedState}
                />
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const user = await getUser(context);
    if (!user) {
        return {
            redirect: {
                destination: 'api/auth',
                permanent: false
            }
        };
    }

    const response = await axios.get(process.env.BACKEND_URI + "/races/governors", 
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    );

    return {
        props: {
            user,
            states: response.data,
            defaultFocusedState: context.query.s || null,
            defaultFocusedRaceIndex: context.query.r || 0
        }
    }
}
