import { createSignal } from "solid-js";
import { Slider } from "@mosheduminer/carbon-solid";

const Default = () => {
  const [val, setVal] = createSignal(87);
  return (
    <>
      <button
        type="button"
        onClick={() => setVal(Math.round(Math.random() * 100))}
      >
        randomize value
      </button>
      <Slider
        max={100}
        min={0}
        value={val()}
        onChange={({ value }) => setVal(value)}
      />
      <h1>{val()}</h1>
    </>
  );
};
export default Default;
