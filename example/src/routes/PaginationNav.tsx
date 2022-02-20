import { PaginationNav } from "carbon-components-solid";

export default function () {
  return (
    <PaginationNav
      totalItems={10}
      itemsShown={10}
      page={0}
      onChange={() => {}}
    />
  );
}
