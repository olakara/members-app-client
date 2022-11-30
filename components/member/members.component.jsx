import { useState, useEffect } from 'react';
import GeneralFilterComponent from '../common/general-filter.component';
import MemberListComponent from './member-list/member-list.component';
import UserPresenter from '../user/user.presenter';
import MembersPresenter from './members.presenter';
import LookupsPresenter from '../../shared/lookups/lookups.presenter';
import ActionButtonComponent from '../common/action-button.component';
import { defaultPagingConfig } from '../../shared/paging-config';

function MembersComponent() {
  const [members, setMembers] = useState([]);
  const [lookups, setLookups] = useState({});
  const [filters, setFilters] = useState(defaultPagingConfig);

  const [canAddMember, setCanAddMemeber] = useState();
  const [canDownloadExcel, setExcelDownloadable] = useState(false);

  const membersPresenter = new MembersPresenter();
  const userPresenter = new UserPresenter();
  const lookupsPresenter = new LookupsPresenter();

  const [actions, setActions] = useState({
    print: false,
    view: false,
  });

  const load = async (filter) => {
    await membersPresenter.load((membersVm) => {
      setMembers(membersVm);
    }, filter);
    await lookupsPresenter.loadUserLookups(async (lookupsVm) => {
      setLookups(lookupsVm);
    });

    await userPresenter.getCurrentUser((generatedViewModel) => {
      const userRole = generatedViewModel.role;
      if (userRole === 'member-viewer') {
        setActions({
          print: false,
          view: true,
        });
      } else {
        setActions({
          print: true,
          view: false,
        });
        setExcelDownloadable(true);
      }
    });
  };

  const handleDownload = async (event) => {
    event.preventDefault();
    await membersPresenter.downloadMembersExcel(filters, (result) => {
      console.log(result);
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
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Members </h1>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            {canDownloadExcel && (
              <a
                onClick={handleDownload}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent cursor-pointer font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 m-2"
              >
                Download
              </a>
            )}
            {canAddMember && <ActionButtonComponent action="/create-member">Add Member</ActionButtonComponent>}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GeneralFilterComponent vm={lookups.searchTypes} handleFilter={handleFilterChange}></GeneralFilterComponent>
        <MemberListComponent members={members} actions={actions} handleChange={handlePageChange}></MemberListComponent>
      </main>
    </div>
  );
}

export default MembersComponent;
