export const sortStates = {
  NONE: "NONE",
  DESC: "DESC",
  ASC: "ASC",
} as const;

/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { sortRows } from "./tools/sorting";
import { State, Props } from "./getDerivedStateFromProps";

// Our initialSortState should be `NONE`, unless a consumer has specified a
// different initialSortState
export const initialSortState = sortStates.NONE;

/**
 * Utility used to get the next sort state given the following pieces of
 * information:
 *
 * @param {string} prevHeader the value of the previous header
 * @param {string} header the value of the currently selected header
 * @param {string} prevState the previous sort state of the table
 * @returns {string}
 */
export const getNextSortDirection = (
  prevHeader: string,
  header: string | null,
  prevState: string
) => {
  // If the previous header is equivalent to the current header, we know that we
  // have to derive the next sort state from the previous sort state
  if (prevHeader === header) {
    // When transitioning, we know that the sequence of states is as follows:
    // NONE -> ASC -> DESC -> NONE
    if (prevState === "NONE") {
      return sortStates.ASC;
    }
    if (prevState === "ASC") {
      return sortStates.DESC;
    }
    return sortStates.NONE;
  }
  // Otherwise, we have selected a new header and need to start off by sorting
  // in descending order by default
  return sortStates.ASC;
};

export const getNextSortState = (
  props: Props,
  state: State,
  { key }: { key: string }
) => {
  const { sortDirection, sortHeaderKey } = state;

  const nextSortDirection = getNextSortDirection(
    key,
    sortHeaderKey,
    sortDirection
  );

  return getSortedState(props, state, key, nextSortDirection);
};

/**
 * Derive the set of sorted state fields from props and state for the given
 * header key and sortDirection
 *
 * @param {object} props
 * @param {string} props.locale The current locale
 * @param {Function} props.sortRow Method to handle sorting a collection of
 * rows
 * @param {object} state
 * @param {Array<string>} state.rowIds Array of row ids
 * @param {object} state.cellsById Lookup object for cells by id
 * @param {Array<string>} state.initialRowOrder Initial row order for the
 * current set of rows
 * @param {string} key The key for the given header we are serving the
 * sorted state for
 * @param {string} sortDirection The sortState that we want to order by
 * @returns {object}
 */
export const getSortedState = (
  props: Props,
  state: State,
  key: string,
  sortDirection: keyof typeof sortStates
) => {
  const { rowIds, cellsById, initialRowOrder } = state;
  const { locale, sortRow } = props;
  const nextRowIds =
    sortDirection !== sortStates.NONE
      ? sortRows({
          rowIds,
          cellsById,
          sortDirection,
          key,
          locale: locale!,
          sortRow: sortRow!,
        })
      : initialRowOrder;
  return {
    sortHeaderKey: key,
    sortDirection: sortDirection,
    rowIds: nextRowIds,
  };
};
