import { useState, useEffect } from "react";

export default function OctaveSelector({ setOctave }) {
  const [oPos, setOpos] = useState(1);
  useEffect(() => {
    setOctave(oPos + 2);
  }, [oPos]);
  return (
    <>
      <button
        onClick={() => {
          oPos < 4 ? setOpos(oPos + 1) : setOpos(1);
        }}
      >
        change octave
      </button>
    </>
  );
}
