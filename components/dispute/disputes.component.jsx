import { useState, useEffect } from 'react';
import GeneralFilterComponent from '../common/general-filter.component';
import DisputeListComponent from './dispute-list/dispute-list.component';
import DisputePresenter from './disputes.presenter';
import LookupsPresenter from '../../shared/lookups/lookups.presenter';

function DisputesComponent() {
  const [disputes, setDisputes] = useState([]);
  const [lookups, setLookups] = useState({});
  const [filters, setFilters] = useState({ searchType: null, searchString: null, pageIndex: 1, pageSize: 10 });

  const disputesPresenter = new DisputePresenter();
  const lookupsPresenter = new LookupsPresenter();

  const load = async (filter) => {
    await lookupsPresenter.loadUserLookups(async (lookupsVm) => {
      setLookups(lookupsVm);
    });
    await disputesPresenter.load((disputesVm) => {
      setDisputes(disputesVm);
    }, filter);
  };

  useEffect(() => {
    load(filters);
  }, [filters]);

  const handleFilterChange = (search) => {
    let filter = { ...filters, searchType: search.searchType, searchString: search.searchText };
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
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Disputes</h1>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GeneralFilterComponent
          vm={lookups.disputeSearchTypes}
          handleFilter={handleFilterChange}
        ></GeneralFilterComponent>
        <DisputeListComponent
          lookups={lookups}
          disputes={disputes}
          handleChange={handlePageChange}
        ></DisputeListComponent>
      </main>
    </div>
  );
}

export default DisputesComponent;
