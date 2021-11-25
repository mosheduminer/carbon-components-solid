import { CheckmarkFilled16 } from "../../../lib/icons/icons/CheckmarkFilled16";
import {
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListInput,
  StructuredListRow,
  StructuredListWrapper,
} from "../../../lib/src";
import { usePrefix } from "../../../lib/src/internal/usePrefix";

export default function () {
  const prefix = usePrefix();
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
    <StructuredListWrapper selection>
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
  );
}
