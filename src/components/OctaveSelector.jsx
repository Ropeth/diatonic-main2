export default function OctaveSelector({ setOctave }) {
  return (
    <>
      <button
        onClick={() => {
          setOctave(5);
        }}
      >
        choose an octave
      </button>
    </>
  );
}
