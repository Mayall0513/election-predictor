import React, { useState } from "react";

import RaceOverviewTable from "./RaceOverviewTable";

import { translations } from "../data/States";

/**
 * Only use this once per page!
 * I don't think the modal will play nice :(
 */
export default (props) => {
    const { user, title, focusedRace, removeSelectedState } = props;

    const [configuringPrediction, setConfiguringPrediction] = useState(false);
    const [showingModal, setShowingModal] = useState(false);

    const onRequestSubmitBet = (e) => {
        if (configuringPrediction) {
            setShowingModal(true);
        }

        else {
            setConfiguringPrediction(true);
        }
    };
    
    const onCancel = (e) => {
        if (configuringPrediction) {
            setConfiguringPrediction(false);
        } 
        
        else {
            if (removeSelectedState) {
                removeSelectedState();
            }
        }
    };

    const onSubmitBid = (e) => {
        setShowingModal(false);
        setConfiguringPrediction(false);
    }

    const predictionEdited = (e) => {
        console.log(e);
    }

    const submitLinkText = configuringPrediction ? "Submit prediction" : "I would like to make a prediction";
    const cancelButtonText = configuringPrediction ? "Cancel prediction" : "Cancel";

    const raceFocused = focusedRace.state && focusedRace.race;

    if (raceFocused) {
        return (
            <>
                { showingModal &&
                    <div className="modal-parent">
                        <div className="modal">
                            <h2>Are you sure?</h2>
                            <p>This cannot be undone</p>
                            <span>
                                <button type="button" onClick={onSubmitBid}>Yes</button>
                                <button type="button>" onClick={() => setShowingModal(false)}>Cancel</button>
                            </span>
                        </div>
                    </div>
                }
                <div className="race-overview">
                    <h2>The {translations[focusedRace.state]} gubernatorial race</h2>
                    <div className="prediction-section">
                        <RaceOverviewTable
                            race={focusedRace.race}
                            wide={true}
                            verboseOdds={true}
                            configuringPrediction={configuringPrediction}
                            predictionEdited={predictionEdited}
                        />
                        <button type="button" className="link-button" onClick={onRequestSubmitBet}>{submitLinkText}</button>
                    </div>
                    <button type="button" onClick={onCancel}>{cancelButtonText}</button>
                </div>
            </>

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
