import React, { useState } from 'react';

import State from './State';
import Tooltip from './StateTooltip';

import { ids as stateIds } from '../data/States';
import { translations } from "../data/States";

export default (props) => {
    const { states, onRaceSelected, focusedRace } = props;

    const [ hoveredRace, setHoveredRace ] = useState({ state: null, race: null });

    const onMouseEnterState = (e) => {
        const { stateId, raceId } = e;
        setHoveredRace({ state: stateId, race: states[stateId].races[raceId] });
    }

    const removeHoveredState = () => {
        setHoveredRace({ state: null, race: null });
    }

    const stateDrawBatches = [[], [], [], []];

    for (const stateId of stateIds) {
        const races = states[stateId]?.races || [];
        const focused = focusedRace?.state === stateId;

        /**
         * Background/excluded states
         * Included states
         * Hovered states
         * Focused states
         */
        const drawBatch = 
            races.length === 0 ?
                0 :
            stateId === hoveredRace.state ?
                2 :
            focused ?
                3 :
                1;
        
         stateDrawBatches[drawBatch].push(
            <State
                key={stateId}

                races={races}
                stateId={stateId}
                focused={focused}
                onClicked={(e) => {
                    removeHoveredState();

                    if (onRaceSelected) {
                        onRaceSelected(e);
                    }
                }}
                mouseEntered={onMouseEnterState}
                mouseLeft={removeHoveredState}
            />
        );
    }

    return (
        <>
            { hoveredRace.race != null && hoveredRace.race != null &&
                <Tooltip
                    race={hoveredRace.race}
                    stateName={translations[hoveredRace.state]}
                />
            }
            <svg width="604" height="380" role="img">
                {stateDrawBatches}
            </svg>
        </>
    )
};