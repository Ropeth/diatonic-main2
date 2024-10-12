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

  //Do this when ballPosX or ballPosY changes
  //play notes
  useEffect(() => {
    let now = Tone.now();
    //set register (= which octave) depending on ballPosY
    let register = "";
    if (harpPlaying == 0 && appStarted == true) {
      switch (true) {
        case -50 <= ballPosY && ballPosY < -17:
          register = "register3";
          break;
        case -17 <= ballPosY && ballPosY < 17:
          register = "register2";
          break;
        case 17 <= ballPosY && ballPosY <= 50:
          register = "register1";
          break;
      }
      //
      switch (true) {
        case -50 <= ballPosX && ballPosX < -30:
          harp.triggerAttackRelease(chords[0][register], "8n", now);
          setHarpPlaying(1);
          setTimeout(() => {
            setHarpPlaying(0);
          }, 300);
          break;
        case -30 <= ballPosX && ballPosX < -10:
          harp.triggerAttackRelease(chords[1][register], "8n", now);
          setHarpPlaying(1);
          setTimeout(() => {
            setHarpPlaying(0);
          }, 300);
          break;
        case -10 <= ballPosX && ballPosX < 10:
          majmin == "maj"
            ? harp.triggerAttackRelease(chords[2][register], "8n", now)
            : harp.triggerAttackRelease(minchords[2][register], "8n", now);
          setHarpPlaying(1);
          setTimeout(() => {
            setHarpPlaying(0);
          }, 300);
          break;
        case 10 <= ballPosX && ballPosX < 30:
          harp.triggerAttackRelease(chords[4][register], "8n", now);
          setHarpPlaying(1);
          setTimeout(() => {
            setHarpPlaying(0);
          }, 300);
          break;
        case 30 <= ballPosX && ballPosX < 50:
          majmin == "maj"
            ? harp.triggerAttackRelease(chords[5][register], "8n", now)
            : harp.triggerAttackRelease(minchords[5][register], "8n", now);
          setHarpPlaying(1);
          setTimeout(() => {
            setHarpPlaying(0);
          }, 300);
      }
    }
  }, [ballPosX, ballPosY]);
  // function accPermission() {
  //   if (typeof DeviceMotionEvent.requestPermission === "function") {
  //     DeviceOrientationEvent.requestPermission()
  //       .then((response) => {
  //         if (response == "granted") {
  //           alert("permission granted");
  //         }
  //       })
  //       .catch(console.error);
  //   }
  // }
  //
  // function iOS() {
  //   return (
  //     [
  //       "iPad Simulator",
  //       "iPhone Simulator",
  //       "iPod Simulator",
  //       "iPad",
  //       "iPhone",
  //       "iPod",
  //     ].includes(navigator.platform) ||
  //     // iPad on iOS 13 detection
  //     (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  //   );
  // }
  return (
    <>
      <p>Move your device to play notes:</p>
      {/* <button onClick={accPermission}>Use device motion?</button> */}
      <div id="ball-container">
        <div className="acc-bg"></div>
        <div id="ball"></div>
      </div>
      {/* <p>harpPlaying{harpPlaying}</p>  */}
    </>
  );
}
//
