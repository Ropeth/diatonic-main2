import MajMinSwitch from "./MajMinSwitch";
import OctaveSelector from "./OctaveSelector";

export default function KeySelector({
  setSelectedKey,
  keys,
  majmin,
  setMajmin,
  setOctave,
}) {
  return (
    <>
      <p>Select a key:</p>
      <div className="key-selector">
        <MajMinSwitch setMajmin={setMajmin} />
        <div className="piano">
          {/* Major keys */}
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
                }}
              >
                {k.keyName}
              </button>
            ))}
          </div>
          {/* Minor keys */}
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
                  //setMajmin("min")
                }}
              >
                {k.keyName}
              </button>
            ))}
          </div>
        </div>
        <OctaveSelector setOctave={setOctave} />
      </div>
    </>
  );
}
