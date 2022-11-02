import React from 'react';

import { paths as statePaths } from '../data/States';

import partyColours from "../data/Parties";

const defaultStateColor = {
    r: 218,
    g: 218,
    b: 218
}

const lerp = (first, second, percent) => {
    return {
        r: second.r + ((first.r - second.r) * percent),
        g: second.g + ((first.g - second.g) * percent),
        b: second.b + ((first.b - second.b) * percent)
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
        const candidateLead = race.candidates[0].odds - races[0].candidates[1].odds;

        const className = "state " + (focused ? "state-focused" : "");

        if (candidateLead < 2) {
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
            const candidateLeadPercent = (candidateLead - 2) / 100;
            const lerpPercent = Math.min(candidateLeadPercent * 2, 1);
            const { r, g, b } = lerp(leadingCandidateColor, defaultStateColor, lerpPercent);           

            return (
                <path
                    className={className}
                    fill={`rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`}
                    d={statePaths[stateId]}
                    onClick={(e) => onClicked({ stateId, raceId: 0, event: e }) }
                    onMouseEnter={(e) => mouseEntered({ stateId, raceId: 0, event: e }) }
                />
            );
        }
    }
}