import { useState, useEffect } from "react";

export default function OctaveSelector({ setOctave }) {
  const [oPos, setOpos] = useState(1);
  useEffect(() => {
    setOctave(oPos + 2);
  }, [oPos]);
  return (
    <>
      <div className="octave-outer">
        <div className="oc-bg">
          <span
            style={{ height: oPos == 1 ? "30%" : oPos == 2 ? "65%" : "100%" }}
          >
            ----
          </span>
        </div>
        <button
          onClick={() => {
            setOpos(3);
          }}
        ></button>
        <button
          onClick={() => {
            setOpos(2);
          }}
        ></button>
        <button
          onClick={() => {
            setOpos(1);
          }}
        ></button>
      </div>
    </>
  );
}
