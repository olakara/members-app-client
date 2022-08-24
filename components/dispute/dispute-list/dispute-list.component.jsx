import { useState, useEffect } from 'react';
import DisputeRowComponent from './dispute-row.component';

function DisputeListComponent({ filter, disputes }) {
  const [filteredDisputes, setDisputes] = useState([]);

  useEffect(() => {
    const temp = filter.search
      ? disputes.filter(
          (e) =>
            e.membershipNo.toLowerCase().includes(filter.search.toLowerCase()) ||
            e.fullName.toLowerCase().includes(filter.search.toLowerCase())
        )
      : disputes;
    setDisputes(temp);
  }, [filter, disputes]);
  return (
    <>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col"></th>
              <th
                scope="col"
                className="hidden py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Membership #
              </th>
              <th scope="col" className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 capitalize sm:table-cell"
              >
                Location
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredDisputes &&
              filteredDisputes.map((memberVm, index) => {
                return <DisputeRowComponent key={index} vm={memberVm} index={index} />;
              })}

            {filteredDisputes.length === 0 && (
              <tr>
                <td colSpan={4} className="py-3.5 pl-4 text-center text-lg">
                  Data not available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DisputeListComponent;
