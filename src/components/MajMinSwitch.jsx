export default function MajMinSwitch({ setMajmin }) {
  return (
    <>
      <button onClick={() => setMajmin("maj")}>maj</button>
      <button onClick={() => setMajmin("min")}>min</button>
    </>
  );
}
