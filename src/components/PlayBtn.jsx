import * as Tone from "tone";

function startTone() {
  Tone.start();
}

export default function PlayBtn({ setAppStarted, appStarted }) {
  return (
    <button
      id="app-start"
      style={{ display: appStarted == false ? "block" : "none" }}
      onClick={() => setAppStarted(true)}
    >
      Play
    </button>
  );
}
