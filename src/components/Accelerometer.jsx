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
  const [upDown, setUpDown] = useState(0);
  const [ballPosX, setBallPosX] = useState([0]);
  const [ballPosY, setBallPosY] = useState([0]);
  const [harpPlaying, setHarpPlaying] = useState(0);
  const ball = document.getElementById("ball");

  //
  function deviceMovedFunction(event) {
    setLeftToRight(event.gamma); // gamma: left to right
    setUpDown(event.beta); // beta: up to down
  }
  function newBallPosX(newPosX) {
    setBallPosX(newPosX);
    if (ball) {
      ball.style.left = `${newPosX}%`;
    }
  }
  function newBallPosY(newPosY) {
    setBallPosY(newPosY);
    if (ball) {
      ball.style.top = `${newPosY}%`;
    }
  }

  //Add movement listener once when appStarted changes
  useEffect(() => {
    window.addEventListener("deviceorientation", deviceMovedFunction);
  }, [appStarted]);

  //keep ball within bounds when leftToRight changes
  useEffect(() => {
    let ballPosX = leftToRight;
    if (leftToRight > -50 && leftToRight < 50) {
      newBallPosX(Math.floor(leftToRight));
    } else if (leftToRight <= -50) {
      newBallPosX(-50);
    } else if (leftToRight >= 50) {
      newBallPosX(50);
    }
  }, [leftToRight]);

  //keep ball within bounds when upDown changes
  useEffect(() => {
    let ballPosY = upDown;
    if (upDown > -50 && upDown < 50) {
      newBallPosY(Math.floor(upDown));
    } else if (upDown <= -50) {
      newBallPosY(-50);
    } else if (upDown >= 50) {
      newBallPosY(50);
    }
  }, [upDown]);

  //Do this when BallPosX  changes
  //play notes
  useEffect(() => {
    let now = Tone.now();
    if (harpPlaying == 0 && appStarted == true) {
      if (ballPosX > 0) {
        switch (true) {
          case -40 <= ballPosX && ballPosX < -24:
            harp.triggerAttackRelease(chords[0].tonic, "8n", now);
            setHarpPlaying(1);
            setTimeout(() => {
              setHarpPlaying(0);
            }, 300);
            break;
          case -24 <= ballPosX && ballPosX < -8:
            harp.triggerAttackRelease(chords[1].tonic, "8n", now);
            setHarpPlaying(1);
            setTimeout(() => {
              setHarpPlaying(0);
            }, 300);
            break;
          case -8 <= ballPosX && ballPosX < 8:
            majmin == "maj"
              ? harp.triggerAttackRelease(chords[2].tonic, "8n", now)
              : harp.triggerAttackRelease(minchords[2].tonic, "8n", now);
            setHarpPlaying(1);
            setTimeout(() => {
              setHarpPlaying(0);
            }, 300);
            break;
          case 8 <= ballPosX && ballPosX < 24:
            harp.triggerAttackRelease(chords[4].tonic, "8n", now);
            setHarpPlaying(1);
            setTimeout(() => {
              setHarpPlaying(0);
            }, 300);
            break;
          case 24 <= ballPosX && ballPosX < 40:
            majmin == "maj"
              ? harp.triggerAttackRelease(chords[5].tonic, "8n", now)
              : harp.triggerAttackRelease(minchords[5].tonic, "8n", now);
            setHarpPlaying(1);
            setTimeout(() => {
              setHarpPlaying(0);
            }, 300);
        }
      }
    }
  }, [ballPosX, ballPosY]);

  return (
    <>
      <div id="ball-container">
        <div id="ball"></div>
      </div>
      {/* <p>leftToRight{leftToRight}</p> 
      <p>ballPosX: {ballPosX}</p>
      <p>ballPosY: {ballPosY}</p>
      <p>harpPlaying{harpPlaying}</p> */}
    </>
  );
}
//
