import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function PagingComponent({ vm, toPage }) {
  const handleNextClick = (event) => {
    event.preventDefault();
    toPage(vm.pageIndex + 1);
  };

  const handlePreviousClick = (event) => {
    event.preventDefault();
    toPage(vm.pageIndex - 1);
  };

  const handleToPage = (event, page) => {
    event.preventDefault();
    toPage(page);
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {vm.hasPreviousPage ? (
          <button
            onClick={handlePreviousClick}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
        ) : (
          <span
            disabled
            className="cursor-not-allowed relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}

        {vm.hasNextPage ? (
          <button
            onClick={handleNextClick}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        ) : (
          <span
            disabled
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </span>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{vm.pageIndex}</span> of{' '}
            <span className="font-medium">{vm.totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {vm.hasPreviousPage ? (
              <button
                onClick={handlePreviousClick}
                className=" relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : (
              <button
                disabled
                className="cursor-not-allowed relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            {new Array(vm.totalPages).fill(1).map((_, index) => {
              return index + 1 === vm.pageIndex ? (
                <button
                  key={index + 1}
                  disabled
                  aria-current="page"
                  className="cursor-not-allowed relative inline-flex items-center border z-10 bg-green-50 border-green-500 text-green-600  px-4 py-2 text-sm font-medium  focus:z-20"
                >
                  {index + 1}
                </button>
              ) : (
                <button
                  key={index + 1}
                  onClick={(event) => handleToPage(event, index + 1)}
                  aria-current="page"
                  className="relative inline-flex items-center border bg-white border-gray-300 text-gray-500 hover:bg-gray-50   px-4 py-2 text-sm font-medium  focus:z-20"
                >
                  {index + 1}
                </button>
              );
            })}

            {vm.hasNextPage ? (
              <button
                onClick={handleNextClick}
                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : (
              <button
                disabled
                className="cursor-not-allowed relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
