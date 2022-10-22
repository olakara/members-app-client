import { useState, useEffect } from 'react';
import MemberRowComponent from './member-row.component';
import PagingComponent from '../../common/paging.component';

export default function MemberListComponent({ members, actions, handleChange }) {
  const [filteredMembers, setMembers] = useState([]);
  const [pageConfig, setPageConfig] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    pageIndex: 1,
    totalCount: 0,
    totalPages: 1,
  });

  useEffect(() => {
    setMembers(members.items);
    setPageConfig({
      hasNextPage: members.hasNextPage,
      hasPreviousPage: members.hasPreviousPage,
      pageIndex: members.pageIndex,
      totalCount: members.totalCount,
      totalPages: members.totalPages,
    });
  }, [members]);

  const handlePageChange = (page) => {
    handleChange(page);
  };

  return (
    <>
      <p className="my-6 text-lg font-bold text-gray-700 sm:text-lg">Result Count: {pageConfig.totalCount || 0}</p>
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
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Agent
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredMembers &&
              filteredMembers.map((memberVm, index) => {
                return <MemberRowComponent key={index} vm={memberVm} actions={actions} index={index} />;
              })}

            {filteredMembers && filteredMembers.length === 0 && (
              <tr>
                <td colSpan={5} className="py-3.5 pl-4 text-center text-lg">
                  Data not available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PagingComponent vm={pageConfig} toPage={handlePageChange}></PagingComponent>
      </div>
    </>
  );
}
