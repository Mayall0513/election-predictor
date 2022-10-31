import React from 'react';

import { paths as statePaths } from '../data/States';

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
        return (
            <path
                className={"state" + (focused ? " state-focused" : "")}
                d={statePaths[stateId]}
                onClick={(e) => { 
                    if (onClicked) {
                        onClicked({ stateId, raceId: 0, event: e }); 
                    }
                }}
                onMouseEnter={(e) => { 
                    if (mouseEntered) {
                        mouseEntered({ stateId, raceId: 0, event: e });
                    }
                }}
            />
        );
    }
}