import { createSignal } from "solid-js";
import { ProgressBar } from "@mosheduminer/carbon-solid";

export default function () {
  const size = 728;
  const [progress, setProgress] = createSignal(0);

  setTimeout(() => {
    const interval = setInterval(() => {
      setProgress((currentProgress) => {
        const advancement = Math.random() * 8;
        if (currentProgress + advancement < size) {
          return currentProgress + advancement;
        } else {
          clearInterval(interval);
          return size;
        }
      });
    }, 50);
  }, 3000);

  const running = () => progress() > 0;

  const helperText = () => {
    let text = running()
      ? `${progress().toFixed(1)}MB of ${size}MB`
      : "Fetching assets...";
    if (progress() >= size) {
      text = "Done";
    }
    return text;
  };

  return (
    <ProgressBar
      value={running() ? progress() : undefined}
      max={size}
      label="Export data"
      helperText={helperText()}
    />
  );
};
