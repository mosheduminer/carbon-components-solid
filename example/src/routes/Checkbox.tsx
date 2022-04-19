import { Checkbox } from "carbon-components-solid";

const prefix = "cds";

export default function () {
  return (
    <fieldset class={`${prefix}--fieldset`}>
      <legend class={`${prefix}--label`}>Checkbox heading</legend>
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
    </fieldset>
  );
}
