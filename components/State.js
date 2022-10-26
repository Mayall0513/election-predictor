import React from 'react';

import { paths as statePaths } from '../data/States';

export default (props) => {
    const { races, stateId, focused, onClicked, mouseEntered, mouseLeft } = props;

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
                onMouseLeave={(e) => { 
                    if (mouseLeft) {
                        mouseLeft({ stateId, raceId: 0, event: e });
                    }
                }}
            />
        );
    }
}