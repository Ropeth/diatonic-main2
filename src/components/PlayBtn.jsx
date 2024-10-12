import * as Tone from "tone";

// function startTone() {
//   Tone.start();
// }

export default function PlayBtn({ setAppStarted, appStarted }) {
  function accPermission() {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response == "granted") {
            alert("permission granted");
          }
        })
        .catch(console.error);
    }
  }
  return (
    <button
      id="app-start"
      style={{ display: appStarted == false ? "block" : "none" }}
      onClick={() => {
        setAppStarted(true);
        accPermission();
        //Promise.try = () => window.screen.orientation.lock("portrait");
      }}
    >
      Play
    </button>
  );
}
