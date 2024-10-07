import { useEffect } from "react";
import { useState } from "react";
import * as Tone from "tone";

export default function Accelorometer({ synth, chords, latestChord }) {
  const [leftToRight, setLeftToRight] = useState(0);
  const ball = document.getElementById("ball");
  //
  function deviceMovedFunction(event) {
    setLeftToRight(event.gamma); // gamma: left to right
  }

  //Do this once when component loads
  useEffect(()=> {window.addEventListener("deviceorientation", deviceMovedFunction);},[])

  //Do this when leftToRight changes
  useEffect(() => {
    let ballPos = leftToRight;
    if (leftToRight > -40 && leftToRight < 40) {
      ballPos = leftToRight;
    } else if (leftToRight <= -40) {
      ballPos = -40;
      // let immed = Tone.immediate();
      // synth.triggerAttackRelease(chords[latestChord].tonic, ".2", immed);
    } else if (ballPos >= 40) {
      ballPos = 40;
    }
    if (ball) {
      ball.style.left = `${ballPos}vw`;
    }
    //
    let immed = Tone.immediate();

    switch (true) {
      case (-40 <= ballPos &&  ballPos < -20):
    console.log("ballPos", ballPos);
        synth.triggerAttackRelease(chords[latestChord].tonic, ".2", immed);
        break;
      case (-20 <= ballPos &&  ballPos < 0):
        synth.triggerAttackRelease(chords[latestChord].mediant, ".2", immed);
        break;
      case  (0 <= ballPos &&  ballPos < 40):
        synth.triggerAttackRelease(chords[latestChord].dominant, ".2", immed);
    }
    
  }, [leftToRight]);

  return (
    <>
      <div id="ball-container">
        <div id="ball"></div>
      </div>
      <p>{leftToRight}</p>
    </>
  );
}
//
