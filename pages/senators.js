import React, { useState } from "react";
import { useRouter } from "next/router";

import RaceOverviewTable from "../components/RaceOverviewTable";
import StatesMap from "../components/StatesMap";

import { translations } from "../data/States";

export default function (props) {
  const { states, defaultFocusedState, defaultFocusedRaceIndex } = props;
  const router = useRouter();

  console.log(states);

  const defaultFocusedRace =
    defaultFocusedState != null && defaultFocusedRaceIndex != null
      ? states[defaultFocusedState].races[defaultFocusedRaceIndex]
      : null;

  const [configuringPrediction, setConfiguringPrediction] = useState(false);
  const [focusedRace, setFocusedRace] = useState({
    state: defaultFocusedState,
    race: defaultFocusedRace,
  });

  const onRaceSelected = (e) => {
    const { stateId, raceId } = e;

    setFocusedRace({ state: stateId, race: states[stateId].races[raceId] });
    router.push(`/senators?s=${stateId}&r=${raceId}`);
  };

  const onRequestSubmitBet = (e) => {
    setConfiguringPrediction(!configuringPrediction);
  };

  const onCancel = (e) => {
    if (configuringPrediction) {
      setConfiguringPrediction(false);
    } else {
      removeSelectedState();
      router.push(`/governors`);
    }
  };

  const removeSelectedState = () => {
    setFocusedRace({ state: null, race: null });
  };

  const submitLinkText = configuringPrediction
    ? "Submit prediction"
    : "I would like to make a prediction";
  const cancelButtonText = configuringPrediction
    ? "Cancel prediction"
    : "Cancel";

  return (
    <div className="root">
      <div className="map-parent">
        <StatesMap
          states={states}
          onRaceSelected={onRaceSelected}
          focusedRace={focusedRace}
        />
      </div>
      {focusedRace.state ? (
        <div className="race-overview">
          <h2>The {translations[focusedRace.state]} senate race</h2>
          <div className="prediction-section">
            <RaceOverviewTable
              race={focusedRace.race}
              wide={true}
              verboseOdds={true}
              configuringPrediction={configuringPrediction}
            />
            <button
              type="button"
              className="link-button"
              onClick={onRequestSubmitBet}
            >
              {submitLinkText}
            </button>
          </div>
          <button type="button" onClick={onCancel}>
            {cancelButtonText}
          </button>
        </div>
      ) : (
        <div className="race-overview">
          <div style={{ textAlign: "center" }} className="prediction-section">
            <h2>Select a state to make a prediction</h2>

            <p>
              Once you click a state you can make click "I would like to make a
              prediction"
            </p>
            <p>[Insert more betting odds information here]</p>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch("http://localhost:3001/races/senators", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const states = await response.json();

  for (const state in states) {
    for (const race in states[state].races) {
      states[state].races[race].candidates.push({
        name: "Other candidate",
        party: "oth",
        incumbent: false,
      });
    }
  }

  return {
    props: {
      states,
      defaultFocusedState: context.query.s || null,
      defaultFocusedRaceIndex: context.query.r || 0,
    },
  };
}
