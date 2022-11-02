import React, { useState } from 'react';
import { isBrowser } from 'react-device-detect';

import State from './State';
import Tooltip from './StateTooltip';

import { ids as stateIds } from '../data/States';
import { translations } from "../data/States";

export default function StatesMap(props) {
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
                onClicked={(e) => onRaceSelected(e)}
                mouseEntered={onMouseEnterState}
            />
        );
    }

    return (
        <>
            <div className="map-parent">
                <svg 
                    className="map"
                    viewBox="0 0 604 380"
                    onMouseOut={removeHoveredState}
                >
                    {stateDrawBatches}
                </svg>
            </div>
  
            { isBrowser && hoveredRace.race != null && hoveredRace.state != null &&
                <Tooltip
                    race={hoveredRace.race}
                    stateName={translations[hoveredRace.state]}
                />
            }
        </>
    )
};