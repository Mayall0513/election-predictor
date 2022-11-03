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
  const [wagerTotal, setWagerTotal] = useState(0);

  const onMakePrediction = (e) => {
    const predictionValues = Object.values(predictions);
    if (!predictionValues.some(x => x !== '0' && x !== '')) {
      return setValidationError("Please make a wager!");
    }

    let newWagerTotal = 0;
    for (const predictionValue of predictionValues) {
      try {
        newWagerTotal += parseInt(predictionValue);
      }
      
      catch(error) {
        return setValidationError(`${predictionValues} is not a number!`);
      }
    }

    if (newWagerTotal > user.xp) {
      return setValidationError('You do not have enough xp to make this wager!');
    }

    if (validationError) {
      setValidationError(null);
    }

    setWagerTotal(newWagerTotal);
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
    const newPrediction = e.event.target.value.replace(wagerRegex, "");
    
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
  
  return (
    <>
      { modalVisible &&
        <div className="modal-parent">
            <div className="modal">
                <h2>Are you sure?</h2>
                <div className="align-left">
                  <p>This will cost you {wagerTotal} experience and cannot be undone!</p>
                  <p>Experience will not be subtracted from your Discord account until after races have<br/>been called, it will be subtracted from your running balance in the top right, though.</p>  
                  <span>
                      <button type="button" onClick={onSubmitPrediction}>Yes</button>
                      <button type="button" className="margin-left-1" onClick={() => setModalVisible(false)}>Cancel</button>
                  </span>
                </div>
            </div>
        </div>
      }
      <table className="table">
        <thead className="align-left">
          <tr>
            <th className={wide ? "min-width-10" : "min-width-8"}>Candidate</th>
            { verboseOdds && 
                <th>
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
            }
            { !verboseOdds && 
              <th>Odds</th>
            }
            { allowPredictions && 
              <th className="padding-left-1">Total Wagered</th>
            }
            { configuringPrediction && 
              <th className="padding-left-1">
                <span>Your Wager</span>
              </th>
            }
          </tr>
        </thead>
        <tbody>
          { race.candidates.map((candidate, i) => {
            const party = ['rep', 'dem', 'ind'].includes(candidate.party) ? 'candidate-' + candidate.party : 'candidate-oth';
            const candidateOdds = candidate.odds === 0 ? '<0.1' : candidate.odds;

            return (
              <tr key={++key} className={party}>
                <td className="incumbent-parent">
                  <span>{candidate.name}</span>
                  { candidate.incumbent && 
                    <span className="incumbent">i</span>
                  }
                </td>
                <td className="align-right">{candidateOdds}</td>
                { allowPredictions && 
                  <td className="align-right">{candidate.totalBet}</td>
                }
                { configuringPrediction &&
                  <td className="align-right">
                    <input
                      type="text"
                      className={"table-text-input " + (validationError ? "table-text-input-error" : "")}
                      value={predictions[candidate.raceId] || ""}
                      placeholder="0"
                      onChange={(e) => onPredictionEdited({ candidate, event: e })}
                    />
                  </td>
                }
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="align-left">
        { validationError && 
          <p className="input-error">{validationError}</p>
        }
        { allowPredictions && (
          configuringPrediction ?
            <>
              <button type="button" className="link-button" onClick={onMakePrediction}>Submit prediction</button>
              <button type="button" className="padding-left-1 link-button" onClick={onCancelPrediction}>Cancel</button>
            </> :
            <button type="button" className="link-button" onClick={onStartPrediction}>Make a prediction</button>
          )
        }
      </div>
    </>
  );
};
