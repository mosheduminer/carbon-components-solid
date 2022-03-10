import { Cell, Header } from "./cells";
/**
 * Default implementation of how we filter rows internally. The idea behind this
 * implementation is to use the given list of row ids and headers to get the
 * individual cell values for a row. Then, we go through each cell value and see
 * if any of them includes the given inputValue.
 *
 * @param {object} config
 * @param {Array<string>} config.rowIds array of all the row ids in the table
 * @param {Array<object>} config.headers
 * @param {object} config.cellsById object containing a map of cell id to cell
 * @param {string} config.inputValue the current input value in the Table Search
 * @param {Function} config.getCellId
 * @returns {Array<string>} rowIds
 */
export const defaultFilterRows = ({
  rowIds,
  headers,
  cellsById,
  inputValue,
  getCellId,
}: {
  rowIds: string[];
  headers: Header[];
  cellsById: { [key: string]: Cell };
  inputValue: string;
  getCellId: (rowId: string, key: string) => string;
}) =>
  rowIds.filter((rowId) =>
    headers.some(({ key }) => {
      const id = getCellId(rowId, key);
      if (typeof cellsById[id].value === "boolean") {
        return false;
      }
      return ("" + cellsById[id].value)
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    })
  );
