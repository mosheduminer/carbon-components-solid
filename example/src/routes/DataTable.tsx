import { For, onMount, createSignal } from "solid-js";
import { Link } from "../../../lib/src/Link";
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
} from "../../../lib/src/DataTable";

const Usage = () => {
  return (
    <DataTable rows={rows} headers={headers} isSortable>
      {(props) => (
        <TableContainer
          title="DataTable"
          description="With sorting"
          {...props.getTableContainerProps()}
        >
          <Table {...props.getTableProps()}>
            <TableHead>
              <TableRow>
                <TableSelectAll {...props.getSelectionProps()} />
                <For each={props.headers}>
                  {(header) => {
                    return (
                      <TableHeader {...props.getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    );
                  }}
                </For>
              </TableRow>
            </TableHead>
            <TableBody>
              <For each={props.rows}>
                {(row) => (
                  <TableRow {...props.getRowProps({ row })}>
                    <TableSelectRow
                      aria-label="select row"
                      {...props.getSelectionProps({ row })}
                    />
                    <For each={row.cells}>
                      {(cell) => <TableCell>{cell.value}</TableCell>}
                    </For>
                  </TableRow>
                )}
              </For>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};

export default Usage;

const rows = [
  {
    id: "a",
    name: "Load Balancer 3",
    protocol: "HTTP",
    port: 3000,
    rule: "Round robin",
    attached_groups: "Kevin's VM Groups",
    status: <Link disabled>Disabled</Link>,
  },
  {
    id: "b",
    name: "Load Balancer 1",
    protocol: "HTTP",
    port: 443,
    rule: "Round robin",
    attached_groups: "Maureen's VM Groups",
    status: <Link>Starting</Link>,
  },
  {
    id: "c",
    name: "Load Balancer 2",
    protocol: "HTTP",
    port: 80,
    rule: "DNS delegation",
    attached_groups: "Andrew's VM Groups",
    status: <Link>Active</Link>,
  },
  {
    id: "d",
    name: "Load Balancer 6",
    protocol: "HTTP",
    port: 3000,
    rule: "Round robin",
    attached_groups: "Marc's VM Groups",
    status: <Link disabled>Disabled</Link>,
  },
  {
    id: "e",
    name: "Load Balancer 4",
    protocol: "HTTP",
    port: 443,
    rule: "Round robin",
    attached_groups: "Mel's VM Groups",
    status: <Link>Starting</Link>,
  },
  {
    id: "f",
    name: "Load Balancer 5",
    protocol: "HTTP",
    port: 80,
    rule: "DNS delegation",
    attached_groups: "Ronja's VM Groups",
    status: <Link>Active</Link>,
  },
];

const headers = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "protocol",
    header: "Protocol",
  },
  {
    key: "port",
    header: "Port",
  },
  {
    key: "rule",
    header: "Rule",
  },
  {
    key: "attached_groups",
    header: "Attached Groups",
  },
  {
    key: "status",
    header: "Status",
  },
];
