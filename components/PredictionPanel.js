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

    if (focusedRace.state && focusedRace.race) {
        return (
            <div className="race-overview">
                <h2>The {translations[focusedRace.state]} {focusedRace.race.race_type === 0 ? "gubernatorial" : "senate"} race</h2>
                <div className="prediction-section">
                    <RaceOverviewTable
                        user={user}
                        race={focusedRace.race}
                        wide={true}
                        verboseOdds={true}
                        allowPredictions={true}
                    />
                </div>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        );
    }

    else  {
        return (
            <div className="race-overview">
                <div style={{ textAlign: "center" }} className="prediction-section">
                    <h2>{title}</h2>
                    <p>After selecting a state using the map on the left, you may see existing odds and make your own predictions.</p>
                </div>
            </div>
        );
    }
};
