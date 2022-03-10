import type { JSX } from "solid-js";
/**
 * Generic helper used to consolidate all call sites for getting a cell id into
 * one method. The strategy currently is that a "cellId" is just the combination
 * of the row id and the header key used to access this field in a row.
 *
 * @param {string} rowId
 * @param {string} header
 * @returns {string}
 */
export const getCellId = (rowId: string, header: string): string =>
  `${rowId}:${header}`;

export type Cell = {
  id: string;
  value: any;
  isEditable: boolean;
  isEditing: boolean;
  isValid: boolean;
  errors: {} | null;
  info: {
    header?: string;
  };
};

export type Header = {
  key: string;
  header: JSX.Element;
} & Partial<Cell>;

export type Row = {
  id: string;
  isSelected: boolean;
  isExpanded: boolean;
  disabled: boolean;
  cells: Cell[];
};
