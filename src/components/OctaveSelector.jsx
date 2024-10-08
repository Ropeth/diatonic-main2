export default function OctaveSelector({ setOctave }) {
  return (
    <>
      <button
        onClick={() => {
          setOctave(5);
        }}
      >
        change octave
      </button>
    </>
  );
}
