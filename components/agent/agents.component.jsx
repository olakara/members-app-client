import { useState, useEffect } from 'react';
import GeneralFilterComponent from '../common/general-filter.component';
import AgentListComponent from './agent-list/agent-list.component';
import UserPresenter from '../user/user.presenter';
import AgentsPresenter from '../agent/agents.presenter';
import LookupsPresenter from '../../shared/lookups/lookups.presenter';
import ActionButtonComponent from '../common/action-button.component';
import { defaultPagingConfig } from '../../shared/paging-config';

function AgentsComponent() {
  const [agents, setAgents] = useState([]);
  const [lookups, setLookups] = useState({});
  const [filters, setFilters] = useState(defaultPagingConfig);
  const [isDistrictAdmin, setIsDistrictAdmin] = useState(false);
  const [canAddAgent, setCanAddAgent] = useState(false);

  const userPresenter = new UserPresenter();
  const agentsPresenter = new AgentsPresenter();
  const lookupsPresenter = new LookupsPresenter();

  const load = async (filter) => {
    await userPresenter.getCurrentUser((generatedViewModel) => {
      const userRole = generatedViewModel.role;
      if (userRole === 'district-admin') setIsDistrictAdmin(true);
      else setIsDistrictAdmin(false);
    });
    await lookupsPresenter.loadUserLookups(async (lookupsVm) => {
      setLookups(lookupsVm);
    });

    await agentsPresenter.load((agentsVm) => {
      setAgents(agentsVm);
    }, filter);

    userPresenter.canUserAddAgent((result) => {
      setCanAddAgent(result);
    });
  };

  useEffect(() => {
    load(filters);
  }, [filters]);

  const handleFilterChange = (search) => {
    let filter = { ...filters, searchType: search.searchType, searchString: search.searchText, pageIndex: 1 };
    setFilters(filter);
  };

  const handlePageChange = (page) => {
    let filter = { ...filters, pageIndex: page };
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
              <ActionButtonComponent action="/create-agent">
                {isDistrictAdmin && 'Add Agent'}
                {!isDistrictAdmin && 'Add User'}
              </ActionButtonComponent>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GeneralFilterComponent vm={lookups.searchTypes} handleFilter={handleFilterChange}></GeneralFilterComponent>
        <AgentListComponent lookups={lookups} agents={agents} handleChange={handlePageChange}></AgentListComponent>
      </main>
    </div>
  );
}

export default AgentsComponent;
