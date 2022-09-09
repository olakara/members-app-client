import { useState } from 'react';
function GeneralFilterComponent({ vm, handleFilter }) {
  const [text, setText] = useState('');
  const [type, setType] = useState('');

  return (
    <>
      <div className="lg:flex items-center justify-between mt-2">
        <div className="md:flex items-center mt-6 lg:mt-0">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Search"
            />
          </div>

          <div className="md:flex mt-6 lg:mt-0">
            <select
              id="type"
              name="type"
              autoComplete="type"
              onChange={(e) => {
                setType(e.target.value);
              }}
              value={type}
              className="md:ml-2 max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md mr-2"
            >
              <option value="">Select</option>
              {vm &&
                vm.map((org, index) => {
                  return (
                    <option key={index} value={org.id}>
                      {org.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="flex items-center mt-4 md:mt-0 md:ml-3 lg:ml-0">
            <button
              disabled={!text || !type}
              onClick={() => handleFilter({ searchType: type, searchText: text })}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent font-medium rounded disabled:text-gray-700 disabled:bg-gray-100 text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
            >
              Search
            </button>
            <button
              onClick={() => {
                setText('');
                setType();
                handleFilter({ searchType: null, searchText: null });
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent font-medium rounded disabled:text-gray-700 disabled:bg-gray-100 text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneralFilterComponent;
