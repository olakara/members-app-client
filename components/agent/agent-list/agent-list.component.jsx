import { useState, useEffect } from 'react';
import AgentRowComponent from './agent-row.component';
import PagingComponent from '../../common/paging.component';

export default function AgentListComponent({ lookups, agents, handleChange }) {
  const [locationLabel, setLocationLabel] = useState('');
  const [filteredAgents, setAgents] = useState([]);
  const [pageConfig, setPageConfig] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    pageIndex: 1,
    totalCount: 0,
    totalPages: 1,
  });

  useEffect(() => {
    setAgents(agents.items);
    setPageConfig({
      hasNextPage: agents.hasNextPage,
      hasPreviousPage: agents.hasPreviousPage,
      pageIndex: agents.pageIndex,
      totalCount: agents.totalCount,
      totalPages: agents.totalPages,
    });
    const userRole = getDefaultRoleForUser(lookups.applicableUserRole ?? []);
    setLocationLabel(getLocationLabel(userRole));
  }, [agents]);

  function getDefaultRoleForUser(applicableUserRoles) {
    if (applicableUserRoles && applicableUserRoles.includes('state-admin')) {
      return 'state-admin';
    }
    return applicableUserRoles.length > 0 ? applicableUserRoles[0] : '';
  }

  function getLocationLabel(roleName) {
    const roleSplitArray = roleName.split('-');
    return roleSplitArray[0];
  }

  const handlePageChange = (page) => {
    handleChange(page);
  };

  return (
    <>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Email
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell capitalize"
              >
                {locationLabel}
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredAgents &&
              filteredAgents.map((agentVm, index) => {
                return <AgentRowComponent key={index} vm={agentVm} index={index} />;
              })}

            {filteredAgents && filteredAgents.length === 0 && (
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
