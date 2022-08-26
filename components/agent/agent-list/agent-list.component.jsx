import { useState, useEffect } from 'react';

import LookupsPresenter from '../../../shared/lookups/lookups.presenter';
import AgentRowComponent from './agent-row.component';

export default function AgentListComponent({ filter, agents }) {
  const [locationLabel, setLocationLabel] = useState('');
  const lookupsPresenter = new LookupsPresenter();
  const [filteredAgents, setAgents] = useState([]);

  useEffect(() => {
    async function load() {
      await lookupsPresenter.loadUserLookups((generatedViewModel) => {
        const userRole = getDefaultRoleForUser(generatedViewModel.applicableUserRole ?? []);
        setLocationLabel(getLocationLabel(userRole));
      });
    }

    load();

    const temp = agents.filter((e) => e.fullName.toLowerCase().includes(filter.search.toLowerCase()));
    setAgents(temp);
  }, [filter, agents]);

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
      </div>
    </>
  );
}
