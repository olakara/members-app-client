import { useState, useEffect } from 'react';
import MemberRowComponent from './member-row.component';

export default function MemberListComponent({ filter, members }) {
  const [filteredMembers, setMembers] = useState([]);

  useEffect(() => {
    const temp = members.filter(
      (e) =>
        e.fullName.toLowerCase().includes(filter.search.toLowerCase()) ||
        e.mobile.includes(filter.search) ||
        e.panchayat.toLowerCase().includes(filter.search.toLowerCase())
    );
    setMembers(temp);
  }, [filter, members]);

  return (
    <>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
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
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 capitalize sm:table-cell"
              >
                Panchayath / Municipality
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Mobile
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                Receipt
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredMembers &&
              filteredMembers.map((memberVm, index) => {
                return <MemberRowComponent key={index} vm={memberVm} index={index} />;
              })}

            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan={5} className="py-3.5 pl-4 text-center text-lg">
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
