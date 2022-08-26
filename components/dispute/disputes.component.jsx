import { useState, useEffect } from 'react';
import GeneralFilterComponent from '../common/general-filter.component';
import DisputeListComponent from './dispute-list/dispute-list.component';
import DisputePresenter from './disputes.presenter';

function DisputesComponent() {
  const [disputes, setDisputes] = useState([]);

  const [filters, setFilters] = useState({
    search: '',
  });

  const disputesPresenter = new DisputePresenter();

  useEffect(() => {
    async function load() {
      await disputesPresenter.load((disputesVm) => {
        setDisputes(disputesVm);
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
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Disputes</h1>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GeneralFilterComponent handleFilter={handleFilterChange}></GeneralFilterComponent>
        <DisputeListComponent filter={filters} disputes={disputes}></DisputeListComponent>
      </main>
    </div>
  );
}

export default DisputesComponent;
