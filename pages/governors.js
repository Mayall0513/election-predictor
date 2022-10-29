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
    };

    return (
        <>
            <Ribbon user={user}/>
            <div className="root">
                <div className="map-parent">
                    <StatesMap
                        states={states}
                        onRaceSelected={onRaceSelected}
                        focusedRace={focusedRace}
                    />
                </div>
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
    const user = getUser(context);
    if (!user) {
        return {
            redirect: {
                destination: 'api/auth',
                permanent: false
            }
        };
    }

    const response = await axios.get(process.env.API_URI + "races/governors", 
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
    
    const states = response.data;

    for (const state in states) {
        for (const race in states[state].races) {
            states[state].races[race].candidates.push({ 
                name: "Other Candidate", 
                party: "oth", 
                incumbent: false 
            })
        }
    }

    return {
        props: {
            user,
            states,
            defaultFocusedState: context.query.s || null,
            defaultFocusedRaceIndex: context.query.r || 0
        }
    }
}
