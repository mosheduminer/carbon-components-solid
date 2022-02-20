import { Cell, Row } from "./cells";

/**
 * Counterpart to `normalize` for a collection of rows. This method unravels the
 * normalization step that we use to build the given parameters in order to
 * return a natural interface to working with rows for a consumer.
 *
 * The default heuristic here is to map through all the row ids and return the
 * value of the row for the given id, in addition to adding a `cells` key that
 * contains the results of mapping over the rows cells and getting individual
 * cell info.
 *
 * @param {Array<string>} rowIds array of row ids in the table
 * @param {object} rowsById object containing lookups for rows by id
 * @param {object} cellsById object containing lookups for cells by id
 */
const denormalize = (
  rowIds: string[],
  rowsById: { [key: string]: Omit<Row, "cells"> & { cells: string[] } },
  cellsById: { [key: string]: Cell }
) => {
  return rowIds.map((id) => ({
    ...rowsById[id],
    cells: rowsById[id].cells.map((cellId) => cellsById[cellId]),
  }));
};

export default denormalize;
