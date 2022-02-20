import { Pagination } from "carbon-components-solid";


const props = {
  page: 1,
  totalItems: 103,
  pagesUnknown: false,
  backwardText: 'Previous page',
  forwardText: 'Next page',
  pageSize: 10,
  pageSizes: [10, 20, 30, 40, 50],
  itemsPerPageText: 'Items per page:',
};

export default function () {
  return (
    <div>
      <Pagination {...props} />
      <Pagination {...props} />
    </div>
  );
};