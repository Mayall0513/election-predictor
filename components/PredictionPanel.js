import React from "react";

import RaceOverviewTable from "./RaceOverviewTable";

import { translations } from "../data/States";

export default function PredictionPanel(props) {
    const { user, title, focusedRace, removeSelectedState } = props;

    const onCancel = (e) => {
        if (removeSelectedState) {
            removeSelectedState();
        }
    };

    const showingRace = focusedRace.state && focusedRace.race;

    return (
        <div className="race-overview">
            <div style={{ visibility: (showingRace ? "hidden" : "visible") }}>
                <h2>{title}</h2>
                <p>After selecting a state using the map on the left, you may see existing odds and make your own predictions.</p>
            </div>
            { showingRace &&
                <>
                    <div className="prediction-section">
                        <h3 className="prediction-section-title">The 
                            <b className="prediction-section-state-name">
                                {" " + translations[focusedRace.state] + " "} 
                            </b> 
                            {focusedRace.race.raceType === 0 ? "gubernatorial" : "senate"} race
                        </h3>
                        <RaceOverviewTable
                            user={user}
                            race={focusedRace.race}
                            wide={true}
                            verboseOdds={true}
                            allowPredictions={true}
                        />
                    </div>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </>
            }
        </div>
    );
};
