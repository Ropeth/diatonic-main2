import { useEffect } from "react";
import { useState } from "react";
import * as Tone from "tone";

export default function Accelorometer({
  harp,
  chords,
  minchords,
  latestChord,
  appStarted,
  majmin,
}) {
  const [leftToRight, setLeftToRight] = useState(0);
  const [ballPos, setBallPos] = useState(0);
  const [harpPlaying, setHarpPlaying] = useState(0);
  const ball = document.getElementById("ball");
  //const harp = new Tone.AMSynth().toDestination();

  //
  function deviceMovedFunction(event) {
    setLeftToRight(event.gamma); // gamma: left to right
  }
  function newBallPos(newPos) {
    setBallPos(newPos);

    if (ball) {
      ball.style.left = `${newPos}%`;
    }
  }

  //Do this once when appStarted changes
  useEffect(() => {
    window.addEventListener("deviceorientation", deviceMovedFunction);
  }, [appStarted]);
  //Do this once when component loads
  // useEffect(() => {
  //   window.addEventListener("deviceorientation", deviceMovedFunction);
  // }, []);

  //Do this when leftToRight changes
  //keep ball within bounds
  useEffect(() => {
    let ballPos = leftToRight;
    if (leftToRight > -50 && leftToRight < 50) {
      newBallPos(Math.floor(leftToRight));
    } else if (leftToRight <= -50) {
      newBallPos(-50);
    } else if (leftToRight >= 50) {
      newBallPos(50);
    }
  }, [leftToRight]);

  //Do this when BallPos changes
  //play notes
  useEffect(() => {
    let now = Tone.now();
    if (harpPlaying == 0 && appStarted == true) {
      switch (true) {
        case -40 <= ballPos && ballPos < -24:
          harp.triggerAttackRelease(chords[0].tonic, "8n", now);
          setHarpPlaying(1);
          setTimeout(() => {
            setHarpPlaying(0);
          }, 300);
          break;
        case -24 <= ballPos && ballPos < -8:
          harp.triggerAttackRelease(chords[1].tonic, "8n", now);
          setHarpPlaying(1);
          setTimeout(() => {
            setHarpPlaying(0);
          }, 300);
          break;
        case -8 <= ballPos && ballPos < 8:
          majmin == "maj"
            ? harp.triggerAttackRelease(chords[2].tonic, "8n", now)
            : harp.triggerAttackRelease(minchords[2].tonic, "8n", now);
          setHarpPlaying(1);
          setTimeout(() => {
            setHarpPlaying(0);
          }, 300);
          break;
        case 8 <= ballPos && ballPos < 24:
          harp.triggerAttackRelease(chords[4].tonic, "8n", now);
          setHarpPlaying(1);
          setTimeout(() => {
            setHarpPlaying(0);
          }, 300);
          break;
        case 24 <= ballPos && ballPos < 40:
          majmin == "maj"
            ? harp.triggerAttackRelease(chords[5].tonic, "8n", now)
            : harp.triggerAttackRelease(minchords[5].tonic, "8n", now);
          setHarpPlaying(1);
          setTimeout(() => {
            setHarpPlaying(0);
          }, 300);
      }
    }
  }, [ballPos]);

  return (
    <>
      <div id="ball-container">
        <div id="ball"></div>
      </div>
      {/* <p>leftToRight{leftToRight}</p>
      <p>ballPos{ballPos}</p>
      <p>harpPlaying{harpPlaying}</p> */}
    </>
  );
}
//
