import { useState, useEffect } from "react";
export default function MajMinSwitch({ setMajmin }) {
  const [up, setUp] = useState(+true);
  useEffect(() => {
    up == +true ? setMajmin("maj") : setMajmin("min");
  }, [up]);
  return (
    <>
      <div className="knob-outer">
        M
        <button
          className="scale-knob"
          style={{ transform: up == true ? "rotate(0deg)" : "rotate(180deg)" }}
          value="check"
          up={up}
          onClick={() => setUp(+!up)}
        >
          I
        </button>
        m
      </div>
    </>
  );
}
