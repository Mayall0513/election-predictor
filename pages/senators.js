import React, { useState } from "react";
import { useRouter } from "next/router";

import axios from 'axios';

import PredictionPanel from "../components/PredictionPanel";
import StatesMap from "../components/StatesMap";
import Ribbon from "../components/Ribbon";
import { getSignedInUser } from '../data/Users';

export default function Senators(props) {
    const { user, states, defaultFocusedState, defaultFocusedRaceIndex } = props;
    const router = useRouter();

    const defaultFocusedRace = defaultFocusedState != null && defaultFocusedRaceIndex != null
        ? states[defaultFocusedState].races[defaultFocusedRaceIndex]
        : null;

    const [focusedRace, setFocusedRace] = useState({ state: defaultFocusedState, race: defaultFocusedRace });

    const onRaceSelected = (e) => {
        const { stateId, raceId } = e;

        setFocusedRace({ state: stateId, race: states[stateId].races[raceId] });
        router.push(`/senators?s=${stateId}&r=${raceId}`);
    };

    const removeSelectedState = () => {
        setFocusedRace({ state: null, race: null });
        router.push(`/senators`);
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
                    title="Select a state to make a senate race prediction"
                    focusedRace={focusedRace}
                    removeSelectedState={removeSelectedState}
                />
          </div>
      </>
    );
}

export async function getServerSideProps(context) {
    const user = await getSignedInUser(context.req);
    if (!user) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false
            }
        };
    }

    const statesResponse = await axios.get(process.env.FRONTEND_URI + "/api/races/senators", 
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    );

    const states = statesResponse.data;
    
    for (const stateId in states) {
        const state = states[stateId];
        
        for (const raceId in state.races) {
            state.races[raceId].candidates = state.races[raceId].candidates.sort((x, y) => y.totalBet - x.totalBet)
        }
    }

    /**
     * If the returned states does not contain the race, race = null
     * Otherwise, race = race
     */
    const defaultFocusedState = Object.keys(states).includes(context.query.s) ? context.query.s : null;

    /**
     * If there is no state, index = null
     * If the index is not a number, index = 0
     * If the index is below 0, index = 0
     * If the index is above the actual number of races, index = last race
     * Otherwise, index = index
     */
    const defaultFocusedRaceIndex = defaultFocusedState == null ? null : 
        Math.min(
            isNaN(parseInt(context.query.r)) || parseInt(context.query.r) < 0 ? 0 : context.query.r,
            states[defaultFocusedState].races.length - 1
        );

    return {
        props: {
            user: user,
            states: states,
            defaultFocusedState,
            defaultFocusedRaceIndex,
        },
    };
}
