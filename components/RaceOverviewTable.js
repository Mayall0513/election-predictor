import React, { useState } from "react";

const wagerRegex = /[^0-9]/g;

export default (props) => {
  const { race, wide, verboseOdds, allowsPredictions, configuringPrediction, predictionEdited } = props;

  const [predictions, setPredictions] = useState([]);

  const onPredictionEditedInternal = (e) => {
    const { value } = e.event.target;
    const newPrediction = value.replace(wagerRegex, "");

    if (newPrediction != predictions[e.index.index]) {
      const newPredictions = [...predictions];
      newPredictions[e.index] = newPrediction;
      setPredictions(newPredictions);

      if (predictionEdited) {
        predictionEdited({ ...e, value: newPredictions });
      }
    }
  };

  let candidateBetsTotal = 0;
  let key = 0;

  race.candidates = race.candidates.sort((x, y) => y.bet_total - x.bet_total);

  for (const candidate of race.candidates) {
    if (candidate.bet_total) {
      candidateBetsTotal += candidate.bet_total;
    }
  }

  return (
    <table className="table">
      <thead className="table-heading">
        <tr>
          <th className={wide ? "min-width-12" : "min-width-10"}>Candidates</th>
          {verboseOdds && (
            <th>
              <span>Odds </span>
              <button type="button" className="link-button">
                (?)
              </button>
            </th>
          )}
          {!verboseOdds && <th>Odds</th>}
          {configuringPrediction && (
            <th className="padding-left-1">
              <span>Amount </span>
              <button type="button" className="link-button">
                (?)
              </button>
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        { race.candidates.map((candidate, i) => {
          const party = ['rep', 'dem', 'ind', 'oth'].includes(candidate.party) ? 'candidate-' + candidate.party : 'candidate-oth';

          const odds = Math.max(
            Math.floor(
              (candidateBetsTotal === 0
                ? 1 / race.candidates.length
                : candidate.bet_total / candidateBetsTotal) * 1000
            ) / 10,
            1
          );

          return (
            <tr key={++key} className={party}>
              <td>
                <span>{candidate.name}</span>
                {candidate.incumbent && (
                  <span className="incumbent">
                    i
                  </span>
                )}
              </td>
              <td>{odds}</td>
              {configuringPrediction && (
                <th>
                  <input
                    type="text"
                    className="table-text-input"
                    value={predictions[i] ? predictions[i] : ""}
                    placeholder="0"
                    onChange={(e) =>
                      onPredictionEditedInternal({
                        candidate,
                        index: i,
                        event: e,
                      })
                    }
                  />
                </th>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
