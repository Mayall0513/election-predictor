import React, { useState } from "react";

import axios from 'axios';

import { useRouter } from 'next/router'

import StaticTooltip from "./StaticTooltip";

const wagerRegex = /[^0-9]/g;

/**
 * Only use this once per page!
 * I don't think the modal will play nice :(
 */
export default function RaceOverviewTable(props) {
  const { user, race, wide, verboseOdds, allowPredictions } = props;
  const router = useRouter();

  const [predictions, setPredictions] = useState(null);
  const [configuringPrediction, setConfiguringPrediction] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onMakePrediction = (e) => {
    const predictionValues = Object.values(predictions);
    if (!predictionValues.some(x => x !== '0' && x !== '')) {
      setValidationError("Please make a prediction");
      return;
    }

    let totalPredictionXp = 0;

    for (const predictionValue of predictionValues) {
      try {
        totalPredictionXp += parseInt(predictionValue);
      }
      
      catch(error) {
        setValidationError(`${predictionValues} is not a number!`);
        return;
      }
    }

    if (totalPredictionXp > user.xp) {
      setValidationError('You do not have enough xp to make this wager!');
      return;
    }

    if (validationError) {
      setValidationError(null);
    }

    setModalVisible(true);
  }

  const onStartPrediction = (e) => {
    setPredictions({});
    setValidationError(null);
    setConfiguringPrediction(true);
  };

  const onCancelPrediction = (e) => {
    setConfiguringPrediction(false);
  };

  const onPredictionEdited = (e) => {
    const { candidate } = e;
    const { value } = e.event.target;

    const newPrediction = value.replace(wagerRegex, "");
    if (newPrediction != predictions[candidate.raceId]) {
      const newPredictions = { ...predictions };
      newPredictions[candidate.raceId] = newPrediction;

      setPredictions(newPredictions);
    }
  };

  const onSubmitPrediction = async (e) => {
    const { stateId, raceType, raceIndex } = race;
    const body = {
      stateId,
      raceType,
      raceIndex,
      predictions
    };
    
    await axios.post(process.env.FRONTEND_URI + '/api/bet/submit', body,
      {
        withCredentials: true
      }
    );

    router.reload();
  }

  let key = 0;
  race.candidates = race.candidates.sort((x, y) => y.odds - x.odds);

  return (
    <>
      { modalVisible &&
        <div className="modal-parent">
            <div className="modal">
                <h2>Are you sure?</h2>
                <p>This cannot be undone</p>
                <span>
                    <button type="button" onClick={onSubmitPrediction}>Yes</button>
                    <button type="button>" onClick={() => setModalVisible(false)}>Cancel</button>
                </span>
            </div>
        </div>
      }
      <table className="table">
        <thead className="table-heading">
          <tr>
            <th className={wide ? "min-width-12" : "min-width-10"}>Candidate</th>
            { verboseOdds && (
                <th className="">
                  <span>Odds </span>
                  <StaticTooltip 
                    contents={
                      <>
                        The chance that this candidate will win the race

                        <p>
                          Based on the percentage of all wagers made on this race that were made towards this candidate winning  
                        </p>
                        <p>
                          Winnings are scaled proportionately against odds. With less likely outcomes rewarding larger payouts
                        </p>

                        If your prediction is incorrect, you lose your wager.
                      </>
                    }
                  />
              </th>
            )}
            {!verboseOdds && <th>Odds</th>}
            {configuringPrediction && (
              <th className="padding-left-1">
                <span>Wager</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          { race.candidates.map((candidate, i) => {
            const party = ['rep', 'dem', 'ind'].includes(candidate.party) ? 'candidate-' + candidate.party : 'candidate-oth';

            return (
              <tr key={++key} className={party}>
                <td>
                  <span>{candidate.name}</span>
                  {candidate.incumbent && (
                    <span className="incumbent">i</span>
                  )}
                </td>
                <td>{candidate.odds === 0 ? '<0.1' : candidate.odds}</td>
                {configuringPrediction && (
                  <th>
                    <input
                      type="text"
                      className={"table-text-input " + (validationError ? "table-text-input-error" : "")}
                      value={predictions[candidate.raceId] ? predictions[candidate.raceId] : ""}
                      placeholder="0"
                      onChange={(e) => onPredictionEdited({ candidate, event: e })}
                    />
                  </th>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      { allowPredictions && (
        configuringPrediction ?
          <>
            { validationError && <p className="input-error">{validationError}</p> }
            <div>
              <button type="button" className="link-button" onClick={onMakePrediction}>Submit prediction</button>
              <button type="button" className="padding-left-1 link-button" onClick={onCancelPrediction}>Cancel</button>
            </div>
          </> :
          <button type="button" className="link-button" onClick={onStartPrediction}>Make a prediction</button>
        )
      }
    </>
  );
};
