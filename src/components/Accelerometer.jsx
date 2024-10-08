import { useEffect } from "react";
import { useState } from "react";
import * as Tone from "tone";

export default function Accelorometer({ harp, chords, latestChord }) {
  const [leftToRight, setLeftToRight] = useState(0);
  const [ballPos, setBallPos] = useState(0);
  const [harpPlaying, setHarpPlaying] = useState(0);
  const ball = document.getElementById("ball");
  //const harp = new Tone.AMSynth().toDestination();

  //
  function deviceMovedFunction(event) {
    setLeftToRight(event.gamma); // gamma: left to right
  }
  // function newBallPos(newPos) {
  //   setBallPos(newPos);
  // }

  //Do this once when component loads
  useEffect(() => {
    window.addEventListener("deviceorientation", deviceMovedFunction);
  }, []);

  //Do this when leftToRight changes
  //keep ball within bounds
  useEffect(() => {
    let ballPos = leftToRight;
    if (leftToRight > -40 && leftToRight < 40) {
      setBallPos(Math.floor(leftToRight));
    } else if (leftToRight <= -40) {
      setBallPos(-40);
    } else if (ballPos >= 40) {
      setBallPos(40);
    }
    if (ball) {
      ball.style.left = `${ballPos}vw`;
    }
  }, [leftToRight]);

  //Do this when BallPos changes
  //play notes
  useEffect(() => {
    console.log(ballPos);
    let immed = Tone.now();
    if (harpPlaying == 0) {
      switch (true) {
        case -40 <= ballPos && ballPos < -20:
          harp.triggerAttackRelease(chords[latestChord].tonic, ".2", immed);
          setHarpPlaying(1);
          setTimeout(() => {
            setHarpPlaying(0);
          }, 500);
          break;
        case -20 <= ballPos && ballPos < 0:
          harp.triggerAttackRelease(chords[latestChord].mediant, ".2", immed);
          setHarpPlaying(1);
          setTimeout(() => {
            setHarpPlaying(0);
          }, 500);
          break;
        case 0 <= ballPos && ballPos < 40:
          harp.triggerAttackRelease(chords[latestChord].dominant, ".2", immed);
          setHarpPlaying(1);
          setTimeout(() => {
            setHarpPlaying(0);
          }, 500);
      }
    }
  }, [ballPos]);

  return (
    <>
      <div id="ball-container">
        <div id="ball"></div>
      </div>
      <p>leftToRight{leftToRight}</p>
      <p>ballPos{ballPos}</p>
      <p>harpPlaying{harpPlaying}</p>
    </>
  );
}
//
