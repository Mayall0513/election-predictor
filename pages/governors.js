import React, { useState } from "react";
import { useRouter } from "next/router";

import RaceOverviewTable from "../components/RaceOverviewTable";
import StatesMap from "../components/StatesMap";

import { translations } from "../data/States";

export default function (props) {
  const { states, defaultFocusedState, defaultFocusedRaceIndex } = props;
  const router = useRouter();

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
    router.push(`/governors?s=${stateId}&r=${raceId}`);
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
          <h2>The {translations[focusedRace.state]} gubernatorial race</h2>
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
  // const response = await fetch("http://localhost:3001/races/governors", {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // });
  // 2

  // const states = await response.json();

  // for (const state in states) {
  //     for (const race in states[state].races) {
  //         states[state].races[race].candidates.push({ name: "Other Candidate", party: "oth", incumbent: false })
  //     }
  // }

  // return {
  //     props: {
  //         states,
  //         defaultFocusedState: context.query.s || null,
  //         defaultFocusedRaceIndex: context.query.r || 0
  //     }
  // }

  return {
    props: {
      states: {
        wa: {
          races: [
            {
              candidates: [
                { name: "Patty Murray", party: "dem", incumbent: true },
                { name: "Tiffany Smiley", party: "rep", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        or: {
          races: [
            {
              candidates: [
                { name: "Christine Drazan", party: "rep", incumbent: false },
                { name: "Tina Kotek", party: "dem", incumbent: false },
                { name: "Betsy Johnson", party: "ind", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        ca: {
          races: [
            {
              candidates: [
                { name: "Gavin Newsom", party: "dem", incumbent: true },
                { name: "Brian Dahle", party: "rep", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        nv: {
          races: [
            {
              candidates: [
                { name: "Joe Lombardo", party: "rep", incumbent: false },
                { name: "Steve Sisolak", party: "dem", incumbent: true },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        az: {
          races: [
            {
              candidates: [
                { name: "Kari Lake", party: "rep", incumbent: false },
                { name: "Katie Hobbs", party: "dem", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        id: {
          races: [
            {
              candidates: [
                { name: "Brad Little", party: "rep", incumbent: true },
                { name: "Stephen Heidt", party: "dem", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        wy: {
          races: [
            {
              candidates: [
                { name: "Mark Gordon", party: "rep", incumbent: true },
                { name: "Theresa Livingston", party: "dem", incumbent: false },
                { name: "Jared Baldes", party: "ind", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        co: {
          races: [
            {
              candidates: [
                { name: "Jared Polis", party: "dem", incumbent: true },
                { name: "Heidi Ganahl", party: "rep", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        nm: {
          races: [
            {
              candidates: [
                {
                  name: "Michelle Lujan Grisham",
                  party: "dem",
                  incumbent: true,
                },
                { name: "Mark Ronchetti", party: "rep", incumbent: false },
                { name: "Karen Bedonie", party: "ind", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        sd: {
          races: [
            {
              candidates: [
                { name: "Kristi Noem", party: "rep", incumbent: true },
                { name: "Jamie Smith", party: "dem", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        ne: {
          races: [
            {
              candidates: [
                { name: "Jim Pillen", party: "rep", incumbent: false },
                { name: "Carol Blood", party: "dem", incumbent: false },
                { name: "Scott Zimmerman", party: "ind", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        ks: {
          races: [
            {
              candidates: [
                { name: "Laura Kelly", party: "dem", incumbent: true },
                { name: "Derek Schmidt", party: "rep", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        ok: {
          races: [
            {
              candidates: [
                { name: "Kevin Stitt", party: "rep", incumbent: true },
                { name: "Joy Hoffmeister", party: "dem", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        tx: {
          races: [
            {
              candidates: [
                { name: "Greg Abbott", party: "rep", incumbent: true },
                { name: "Beto O'Rourke", party: "dem", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        mn: {
          races: [
            {
              candidates: [
                { name: "Tim Walz", party: "dem", incumbent: true },
                { name: "Scott Jensen", party: "rep", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        ia: {
          races: [
            {
              candidates: [
                { name: "Kim Reynolds", party: "rep", incumbent: true },
                { name: "Deidre DeJear", party: "dem", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        ar: {
          races: [
            {
              candidates: [
                {
                  name: "Sarah Huckabee Sanders",
                  party: "rep",
                  incumbent: false,
                },
                { name: "Chris Jones", party: "dem", incumbent: false },
                {
                  name: "Ricky Dale Harrington Jr.",
                  party: "ind",
                  incumbent: false,
                },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        wi: {
          races: [
            {
              candidates: [
                { name: "Tony Evers", party: "rep", incumbent: true },
                { name: "Tim Michels", party: "dem", incumbent: false },
                {
                  name: "Joan Ellis Beglinger",
                  party: "ind",
                  incumbent: false,
                },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        il: {
          races: [
            {
              candidates: [
                { name: "Jay Robert Pritzker", party: "dem", incumbent: true },
                { name: "Darren Bailey", party: "rep", incumbent: false },
                { name: "Scott Schluter", party: "ind", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        tn: {
          races: [
            {
              candidates: [
                { name: "Bill Lee", party: "rep", incumbent: true },
                {
                  name: "Jason Brantly Martin",
                  party: "dem",
                  incumbent: false,
                },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        al: {
          races: [
            {
              candidates: [
                { name: "Kay Ivey", party: "rep", incumbent: true },
                {
                  name: "Yolanda Rochelle Flowers",
                  party: "dem",
                  incumbent: false,
                },
                { name: "James Blake", party: "ind", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        ga: {
          races: [
            {
              candidates: [
                { name: "Brian Kemp", party: "rep", incumbent: true },
                { name: "Stacy Abrams", party: "dem", incumbent: false },
                { name: "Shane Hazel", party: "ind", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        fl: {
          races: [
            {
              candidates: [
                { name: "Ron DeSantis", party: "rep", incumbent: true },
                { name: "Charlie Crist", party: "dem", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        sc: {
          races: [
            {
              candidates: [
                { name: "Henry McMaster", party: "rep", incumbent: true },
                { name: "Joe Cunningham", party: "dem", incumbent: false },
                { name: "Bruce Reeves", party: "ind", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        mi: {
          races: [
            {
              candidates: [
                { name: "Getchem Whitmer", party: "dem", incumbent: true },
                { name: "Tudor Dixon", party: "rep", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        oh: {
          races: [
            {
              candidates: [
                { name: "Mike DeWine", party: "rep", incumbent: true },
                { name: "Nan Whaley", party: "dem", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        pa: {
          races: [
            {
              candidates: [
                { name: "Josh Shapiro", party: "dem", incumbent: false },
                { name: "Douglas Mastriano", party: "rep", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        md: {
          races: [
            {
              candidates: [
                { name: "Wes Moore", party: "dem", incumbent: false },
                { name: "Dan Cox", party: "rep", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        ny: {
          races: [
            {
              candidates: [
                { name: "Kathy Hochul", party: "dem", incumbent: true },
                { name: "Lee Zeldin", party: "rep", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        vt: {
          races: [
            {
              candidates: [
                { name: "Phil Scott", party: "rep", incumbent: true },
                { name: "Brenda Siegal", party: "dem", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        ct: {
          races: [
            {
              candidates: [
                { name: "Edward Lamont", party: "dem", incumbent: true },
                { name: "Robert Stefanowki", party: "rep", incumbent: false },
                { name: "Robert Hotaling", party: "ind", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        nh: {
          races: [
            {
              candidates: [
                { name: "Chris Sununu", party: "rep", incumbent: true },
                { name: "Tom Sherman", party: "dem", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        ri: {
          races: [
            {
              candidates: [
                { name: "Daniel McKee", party: "dem", incumbent: true },
                { name: "Ashley Kalus", party: "rep", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        ma: {
          races: [
            {
              candidates: [
                { name: "Maura Healey", party: "rep", incumbent: false },
                { name: "Geoff Diehl", party: "dem", incumbent: false },
                { name: "Kevin Reed", party: "ind", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        me: {
          races: [
            {
              candidates: [
                { name: "Janet Mills", party: "dem", incumbent: true },
                { name: "Paul LePage", party: "rep", incumbent: false },
                { name: "Sam Hunkler", party: "ind", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        ak: {
          races: [
            {
              candidates: [
                { name: "Mike Dunleavy", party: "rep", incumbent: true },
                { name: "Bill Walker", party: "ind", incumbent: false },
                { name: "Les Gara", party: "dem", incumbent: false },
                { name: "Charlie Pierce", party: "rep", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
        hi: {
          races: [
            {
              candidates: [
                { name: "Josh Green", party: "dem", incumbent: true },
                { name: "Duke Aiona", party: "rep", incumbent: false },
                { name: "Other Candidate", party: "oth", incumbent: false },
              ],
            },
          ],
        },
      },
      defaultFocusedState: context.query.s || null,
      defaultFocusedRaceIndex: context.query.r || 0,
    },
  };
}
