import { DataTableProps } from "./DataTable";
import { initialSortState, getSortedState, sortStates } from "./sorting";
import { Cell, Header, Row } from "./tools/cells";
import normalize from "./tools/normalize";

export type State = {
  cellsById: { [key: string]: Cell };
  rowIds: string[];
  initialRowOrder: string[];
  sortDirection: keyof typeof sortStates;
  sortHeaderKey: string | null;
  rowsById: { [key: string]: Row };
  filterInputValue?: string | null;
  shouldShowBatchActions?: boolean;
  isExpandedAll?: boolean;
};

export interface Props extends DataTableProps {
  rows: Row[];
  headers: Header[];
}

/**
 * Helper to derive the next state from the given props and the
 * prevState. Potential future-facing API hook for React v17.
 *
 * Currently, it's being used as a way to normalize the incoming data that we
 * are receiving for rows
 */
const getDerivedStateFromProps = (props: Props, prevState: State): State => {
  const { rowIds, rowsById, cellsById } = normalize(
    props.rows,
    props.headers,
    prevState
  );
  const state: State = {
    rowIds,
    rowsById,
    cellsById,
    sortDirection: prevState.sortDirection || initialSortState,
    sortHeaderKey: prevState.sortHeaderKey || null,
    // Copy over rowIds so the reference doesn't mutate the stored
    // `initialRowOrder`
    initialRowOrder: rowIds.slice(),
    filterInputValue: prevState.filterInputValue || null,

    // Optional state field to indicate whether a consumer should show a
    // batch actions menu
    shouldShowBatchActions: prevState.shouldShowBatchActions || false,
  };

  if (prevState.sortDirection && prevState.sortHeaderKey) {
    const { rowIds } = getSortedState(
      props,
      state,
      prevState.sortHeaderKey,
      prevState.sortDirection
    );
    state.rowIds = rowIds;
  }

  return state;
};

export default getDerivedStateFromProps;
