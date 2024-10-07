export default function KeySelector({ setSelectedKey, keys, setMajmin }) {
  return (
    <div>
      <h2>Major keys</h2>
      {keys.map((k) => (
        <button
          key={k.id}
          value={k.id}
          onClick={(e) => {
            setSelectedKey(e.target.value);
            setMajmin("maj");
          }}
        >
          {k.keyName}
        </button>
      ))}
      <h2>Minor keys</h2>
      {keys.map((k) => (
        <button
          key={k.id}
          value={k.id}
          onClick={(e) => {
            setSelectedKey(e.target.value);
            setMajmin("min");
          }}
        >
          {k.keyName}
        </button>
      ))}
    </div>
  );
}
