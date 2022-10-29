import React, { useEffect, useState } from 'react';

import RaceOverviewTable from './RaceOverviewTable';

export default (props) => {
    const { race, stateName } = props;
    const [ mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: -1000 });

    const updateTooltip = (e) => {
        setMouseCoordinates({ x: e.pageX, y: e.pageY });
    }

    useEffect(() => {
        window.addEventListener('mousemove', updateTooltip);

        return () => {
            window.removeEventListener('mousemove', updateTooltip);
        };
    });

    if (!race) {
        return;
    }

    return (
        <div className="tooltip" style={{
            position: "fixed",
            top: mouseCoordinates.y + 14,
            left: mouseCoordinates.x + 14
        }}>
            <h3 className="tooltip-title">{stateName}</h3>
            <RaceOverviewTable 
                race={race}
                wide={false}
                verboseOdds={false}
                allowsPredictions={false}
                configuringPrediction={false}
            />
            <span className="tooltip-hint">Click for more information</span>
        </div>
    )
};