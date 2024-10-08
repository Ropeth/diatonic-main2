import MajMinSwitch from "./MajMinSwitch";
export default function KeySelector({
  setSelectedKey,
  keys,
  majmin,
  setMajmin,
}) {
  return (
    <>
      <MajMinSwitch setMajmin={setMajmin} />
      <div className="piano">
        {/* <h2>Major keys</h2> */}
        <div
          className="major"
          style={{ display: majmin == "maj" ? "grid" : "none" }}
        >
          {keys.map((k) => (
            <button
              key={k.id}
              value={k.id}
              onClick={(e) => {
                setSelectedKey(e.target.value);
                //setMajmin("maj");
              }}
            >
              {k.keyName}
            </button>
          ))}
        </div>
        {/* <h2>Minor keys</h2> */}
        <div
          className="minor"
          style={{ display: majmin == "min" ? "grid" : "none" }}
        >
          {keys.map((k) => (
            <button
              key={k.id}
              value={k.id}
              onClick={(e) => {
                setSelectedKey(e.target.value);
                //setMajmin("min");
              }}
            >
              {k.keyName}
            </button>
          ))}
        </div>
        {majmin}
      </div>
    </>
  );
}
