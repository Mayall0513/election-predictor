import React from 'react';

import { paths as statePaths } from '../data/States';

import partyColours from "../data/Parties";

const defaultStateColor = {
    r: 218,
    g: 218,
    b: 218
}

const lerpr = (first, second, percent) => {
    return {
        r: Math.floor(second.r + ((first.r - second.r) * percent)),
        g: Math.floor(second.g + ((first.g - second.g) * percent)),
        b: Math.floor(second.b + ((first.b - second.b) * percent))
    }
};

export default function State(props) {
    const { races, stateId, focused, onClicked, mouseEntered } = props;

    if (races.length === 0) {
        return (
            <path
                className="state state-excluded"
                d={statePaths[stateId]}
            />
        );
    }

    else {
        const race = races[0];
        const { odds, party } = race.candidates[0];
        const className = "state " + (focused ? "state-focused" : "");
        let candidateLead = null;

        for (let i = 1; i < race.candidates.length; i++) {
            const secondRace = race.candidates[i];

            if (party !== secondRace.party) {
                candidateLead = parseInt(odds) - parseInt(secondRace.odds);
                break;
            }
        }

        if (candidateLead < 0.5) {
            return (
                <path
                    className={className}
                    fill="#dadada"
                    d={statePaths[stateId]}
                    onMouseUp={(e) => onClicked({ stateId, raceId: 0, event: e }) }
                    onMouseEnter={(e) => mouseEntered({ stateId, raceId: 0, event: e }) }
                />
            );
        }

        else {
            const leadingCandidateParty = race.candidates[0].party || 'oth';
            const leadingCandidateColor = partyColours[leadingCandidateParty];
            const candidateLeadPercent = (candidateLead - 0.5) / 100;
            const lerpPercent = Math.min(candidateLeadPercent * 2, 1);
            const { r, g, b } = lerpr(leadingCandidateColor, defaultStateColor, lerpPercent);           

            return (
                <path
                    className={className}
                    fill={`rgb(${r}, ${g}, ${b})`}
                    d={statePaths[stateId]}
                    onClick={(e) => onClicked({ stateId, raceId: 0, event: e }) }
                    onMouseEnter={(e) => mouseEntered({ stateId, raceId: 0, event: e }) }
                />
            );
        }
    }
}