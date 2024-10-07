import * as Tone from "tone";

function initialise() {
  Tone.start();
}

export default function Chord({
  thisClass,
  tonic,
  mediant,
  dominant,
  chordName,
  synth,
  setLatestChord,
}) {
  return (
    <button
      className={thisClass}
      onMouseLeave={() => handleMouseOut({ synth, chordName })}
      onMouseEnter={() =>
        handleMouseOver({
          tonic,
          mediant,
          dominant,
          synth,
          chordName,
          setLatestChord,
        })
      }
      onClick={initialise}
    >
      <p className="chord-note">{tonic}</p>
      <p className="chord-role">{chordName}</p>
      {/* <p>{chordID}</p> */}
    </button>
  );
}
function handleMouseOver({
  tonic,
  mediant,
  dominant,
  synth,
  setLatestChord,
  chordName,
}) {
  //console.log("over: ", chordName);
  console.log("activevoices", synth.activeVoices);
  console.log("chordName", chordName);
  //setLatestChord(chordID);
  let immed = Tone.immediate();

  synth.context.resume();
  synth.triggerAttack(tonic, immed);
  synth.triggerAttack(mediant, immed);
  synth.triggerAttack(dominant, immed);
  //
  synth.triggerRelease(tonic, immed + 10);
  synth.triggerRelease(mediant, immed + 10);
  synth.triggerRelease(dominant, immed + 10);
}
function handleMouseOut({ synth, chordName }) {
  console.log("mouse out:", chordName);
  let immed = Tone.immediate();
  synth.releaseAll(immed);
  // synth.triggerRelease(tonic, immed);
  // synth.triggerRelease(mediant, immed);
  // synth.triggerRelease(dominant, immed);
}
