import { useState, useEffect } from "react";
import "./App.css";
import Chord from "./components/Chord";
import KeySelector from "./components/KeySelector";
import Accelerometer from "./components/Accelerometer";
import * as Tone from "tone";
import Harp from "./components/Harp";
import OctaveSelector from "./components/OctaveSelector";
import PlayBtn from "./components/PlayBtn";

function App() {
  const [selectedKey, setSelectedKey] = useState(0);
  const [majmin, setMajmin] = useState("maj");
  const [octave, setOctave] = useState(4);
  const [latestChord, setLatestChord] = useState(0);
  const [appStarted, setAppStarted] = useState(false);

  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const harp = new Tone.PolySynth(Tone.Synth).toDestination();
  //console.log("synth.volume=", synth.volume);
  //const vol = new Tone.Volume(-12).toDestination();

  const keys = [
    { id: 0, keyName: "C", note: "C" + octave },
    { id: 1, keyName: "C#", note: "C#" + octave },
    { id: 2, keyName: "D", note: "D" + octave },
    { id: 3, keyName: "D#", note: "D#" + octave },
    { id: 4, keyName: "E", note: "E" + octave },
    { id: 5, keyName: "F", note: "F" + octave },
    { id: 6, keyName: "F#", note: "F#" + octave },
    { id: 7, keyName: "G", note: "G" + octave },
    { id: 8, keyName: "G#", note: "G#" + octave },
    { id: 9, keyName: "A", note: "A" + octave },
    { id: 10, keyName: "A#", note: "A#" + octave },
    { id: 11, keyName: "B", note: "B" + octave },
  ];

  const chords = [
    {
      id: 0,
      role: "I Maj",
      class: "i-chord",
      tonic: keys[selectedKey].note,
      mediant: keys[(Number(selectedKey) + 4) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 7) % keys.length].note,
    },
    {
      id: 1,
      role: "II min",
      class: "ii-chord",
      tonic: keys[(Number(selectedKey) + 2) % keys.length].note,
      mediant: keys[(Number(selectedKey) + 5) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 9) % keys.length].note,
    },
    {
      id: 2,
      role: "III min",
      class: "iii-chord",
      tonic: keys[(Number(selectedKey) + 4) % keys.length].note,
      mediant: keys[(Number(selectedKey) + 7) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 11) % keys.length].note,
    },
    {
      id: 3,
      role: "IV Maj",
      class: "iv-chord",
      tonic: keys[(Number(selectedKey) + 5) % keys.length].note,
      mediant: keys[(Number(selectedKey) + 9) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 12) % keys.length].note,
    },
    {
      id: 4,
      role: "V Maj",
      class: "v-chord",
      tonic: keys[(Number(selectedKey) + 7) % keys.length].note,
      mediant: keys[(Number(selectedKey) + 11) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 14) % keys.length].note,
    },
    {
      id: 5,
      role: "VI min",
      class: "vi-chord",
      tonic: keys[(Number(selectedKey) + 9) % keys.length].note,
      mediant: keys[(Number(selectedKey) + 12) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 16) % keys.length].note,
    },

    {
      id: 6,
      role: "VII dim",
      class: "vii-chord",
      tonic: keys[(Number(selectedKey) + 11) % keys.length].note,
      mediant: keys[(Number(selectedKey) + 14) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 17) % keys.length].note,
    },
  ];
  const minchords = [
    {
      id: 0,
      role: "I min",
      class: "i-chord",
      tonic: keys[selectedKey].note,
      mediant: keys[(Number(selectedKey) + 3) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 7) % keys.length].note,
    },
    {
      id: 1,
      role: "II dim",
      class: "ii-chord",
      tonic: keys[(Number(selectedKey) + 2) % keys.length].note,
      mediant: keys[(Number(selectedKey) + 5) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 8) % keys.length].note,
    },
    {
      id: 2,
      role: "III Maj",
      class: "iii-chord",
      tonic: keys[(Number(selectedKey) + 3) % keys.length].note,
      mediant: keys[(Number(selectedKey) + 7) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 10) % keys.length].note,
    },
    {
      id: 3,
      role: "IV min",
      class: "iv-chord",
      tonic: keys[(Number(selectedKey) + 5) % keys.length].note,
      mediant: keys[(Number(selectedKey) + 8) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 12) % keys.length].note,
    },
    {
      id: 4,
      role: "V min",
      class: "v-chord",
      tonic: keys[(Number(selectedKey) + 7) % keys.length].note,
      mediant: keys[(Number(selectedKey) + 10) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 14) % keys.length].note,
    },
    {
      id: 5,
      role: "VI Maj",
      class: "vi-chord",
      tonic: keys[(Number(selectedKey) + 8) % keys.length].note,
      mediant: keys[(Number(selectedKey) + 12) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 15) % keys.length].note,
    },

    {
      id: 6,
      role: "VII Maj",
      class: "vii-chord",
      tonic: keys[(Number(selectedKey) + 10) % keys.length].note,
      mediant: keys[(Number(selectedKey) + 14) % keys.length].note,
      dominant: keys[(Number(selectedKey) + 17) % keys.length].note,
    },
  ];
  //
  //end setup
  //
  //
  //begin page content
  //
  return (
    <>
      <PlayBtn appStarted={appStarted} setAppStarted={setAppStarted}></PlayBtn>
      <KeySelector
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        setMajmin={setMajmin}
        majmin={majmin}
        keys={keys}
      />
      {/* <OctaveSelector setOctave={setOctave} />
      <p>{octave}</p>
      <p>
        Current key: {keys[selectedKey].keyName} {majmin} Playing: {latestChord}
      </p> */}
      <div className="board">
        {majmin == "maj"
          ? chords.map((c) => (
              <Chord
                key={c.id}
                thisClass={c.class}
                tonic={c.tonic}
                mediant={c.mediant}
                dominant={c.dominant}
                chordName={c.role}
                synth={synth}
                setLatestChord={setLatestChord}
                appStarted={appStarted}
              />
            ))
          : minchords.map((c) => (
              <Chord
                key={c.id}
                thisClass={c.class}
                tonic={c.tonic}
                mediant={c.mediant}
                dominant={c.dominant}
                chordName={c.role}
                synth={synth}
                setLatestChord={setLatestChord}
                appStarted={appStarted}
              />
            ))}
      </div>
      <Harp
        synth={synth}
        chords={chords}
        latestChord={latestChord}
        appStarted={appStarted}
      />
      <Accelerometer
        harp={harp}
        chords={chords}
        minchords={minchords}
        latestChord={latestChord}
        appStarted={appStarted}
        majmin={majmin}
      />
    </>
  );
}

export default App;
