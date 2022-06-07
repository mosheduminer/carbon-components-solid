import { PaginationNav } from "@mosheduminer/carbon-solid";

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
