import { useEffect } from "react";
import * as Tone from "tone";

export default function Harp({ synth, chords, latestChord, appStarted }) {
  useEffect(() => {
    window.addEventListener("keyup", handleKeyup, true);
  }, [appStarted]);

  function handleKeyup(e) {
    e.preventDefault();

    console.log("appStarted=", appStarted);
    if (appStarted == true) {
      console.log(e.key);
      let immed = Tone.immediate();
      switch (e.key) {
        case "q":
          synth.triggerAttackRelease(chords[latestChord].tonic, ".2", immed);
          break;
        case "w":
          synth.triggerAttackRelease(chords[latestChord].mediant, ".2", immed);
          break;
        case "e":
          synth.triggerAttackRelease(chords[latestChord].dominant, ".2", immed);
      }
    }
  }

  return <p>This is where the harp will be </p>;
}
