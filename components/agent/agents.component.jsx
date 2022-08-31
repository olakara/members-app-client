import Link from 'next/link';
import AgentListComponent from './agent-list/agent-list.component';
import GeneralFilterComponent from '../common/general-filter.component';
import AgentsPresenter from '../agent/agents.presenter';
import { useState, useEffect } from 'react';

import UserPresenter from '../user/user.presenter';
import AddButtonComponent from '../common/add-button.component';

function AgentsComponent() {
  const userPresenter = new UserPresenter();
  const agentsPresenter = new AgentsPresenter();
  const [isDistrictAdmin, setIsDistrictAdmin] = useState(false);
  const [agents, setAgents] = useState([]);

  const [filters, setFilters] = useState({
    search: '',
  });

  const [canAddAgent, setCanAddAgent] = useState(false);

  useEffect(() => {
    async function load() {
      await userPresenter.getCurrentUser((generatedViewModel) => {
        const userRole = generatedViewModel.role;

        if (userRole === 'district-admin') setIsDistrictAdmin(true);
        else setIsDistrictAdmin(false);
      });

      await agentsPresenter.load((generatedViewModel) => {
        setAgents(generatedViewModel);
      });

      userPresenter.canUserAddAgent((result) => {
        setCanAddAgent(result);
      });
    }
    load();
  }, []);

  const handleFilterChange = (filter) => {
    setFilters(filter);
  };

  return (
    <div className="py-10">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Users</h1>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            {canAddAgent && (
              <AddButtonComponent action="/create-agent">
                {isDistrictAdmin && 'Add Agent'}
                {!isDistrictAdmin && 'Add User'}
              </AddButtonComponent>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GeneralFilterComponent handleFilter={handleFilterChange}></GeneralFilterComponent>
        <AgentListComponent filter={filters} agents={agents}></AgentListComponent>
      </main>
    </div>
  );
}

export default AgentsComponent;
