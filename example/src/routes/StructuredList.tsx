import { createSignal } from "solid-js";
import { CheckmarkFilled16 } from "@mosheduminer/carbon-solid/icons/CheckmarkFilled16";
import {
  Checkbox,
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListInput,
  StructuredListRow,
  StructuredListWrapper,
} from "@mosheduminer/carbon-solid";
//import { usePrefix } from "@mosheduminer/carbon-solid/src/internal/usePrefix";

export default function () {
  const [isFlush, setIsFlush] = createSignal(false);
  const [isCondensed, setIsCondensed] = createSignal(false);
  const [selection, setSelection] = createSignal(true);
  const prefix = "bx" // usePrefix();
  const structuredListBodyRowGenerator = (numRows) => {
    return [...Array(numRows)].map((_, i) => (
      <StructuredListRow label>
        <StructuredListCell>Row {i}</StructuredListCell>
        <StructuredListCell>Row {i}</StructuredListCell>
        <StructuredListCell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
          magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
          sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
          vulputate nisl a porttitor interdum.
        </StructuredListCell>
        <StructuredListInput
          id={`row-${i}`}
          value={`row-${i}`}
          title={`row-${i}`}
          name="row-0"
          checked={!i || null}
        />
        <StructuredListCell>
          <CheckmarkFilled16
            class={`${prefix}--structured-list-svg`}
            aria-label="select an option"
          >
            <title>select an option</title>
          </CheckmarkFilled16>
        </StructuredListCell>
      </StructuredListRow>
    ));
  };
  return (
    <>
      <Checkbox
        onChange={(e, details) => {
          setSelection(details.checked);
        }}
        labelText="Selection"
        id="selection-checkbox"
        checked={selection()}
      />
      <Checkbox
        onChange={(e, details) => {
          setIsCondensed(details.checked);
        }}
        labelText="Condensed"
        id="condensed-checkbox"
      />
      <Checkbox
        onChange={(e, details) => {
          setIsFlush(details.checked);
        }}
        labelText="Flush"
        id="flush-checkbox"
      />
      <StructuredListWrapper
        selection={selection()}
        isCondensed={isCondensed()}
        isFlush={isFlush()}
      >
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>ColumnA</StructuredListCell>
            <StructuredListCell head>ColumnB</StructuredListCell>
            <StructuredListCell head>ColumnC</StructuredListCell>
            <StructuredListCell head>{""}</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {structuredListBodyRowGenerator(4)}
        </StructuredListBody>
      </StructuredListWrapper>
    </>
  );
}
