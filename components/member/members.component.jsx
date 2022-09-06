import Link from 'next/link';
import { useState, useEffect } from 'react';
import GeneralFilterComponent from '../common/general-filter.component';
import UserPresenter from '../user/user.presenter';
import MemberListComponent from './member-list/member-list.component';
import MembersPresenter from './members.presenter';
import ActionButtonComponent from '../common/action-button.component';

function MembersComponent() {
  const [members, copyMembersViewModelToStateModel] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    panchayat: null,
  });

  const [canAddMember, setCanAddMemeber] = useState();

  const membersPresenter = new MembersPresenter();
  const userPresenter = new UserPresenter();

  useEffect(() => {
    async function load() {
      await membersPresenter.load((generatedViewModel) => {
        copyMembersViewModelToStateModel(generatedViewModel);
      });
      userPresenter.canUserAddMember((result) => {
        setCanAddMemeber(result);
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
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Members </h1>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            {canAddMember && <ActionButtonComponent action="/create-member">Add Member</ActionButtonComponent>}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GeneralFilterComponent handleFilter={handleFilterChange}></GeneralFilterComponent>
        <MemberListComponent filter={filters} members={members}></MemberListComponent>
      </main>
    </div>
  );
}

export default MembersComponent;
