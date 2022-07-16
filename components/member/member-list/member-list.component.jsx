import { useState, useEffect } from 'react';
import MembersPresenter from '../members.presenter';
import LookupsPresenter from '../../../shared/lookups/lookups.presenter';
import MemberRowComponent from '../member-list/member-row.component';

export default function MemberListComponent(props) {
  const [vm, copyViewModelToStateModel] = useState([]);
  const [locationLabel, setLocationLabel] = useState('');

  const membersPresenter = new MembersPresenter();
  const lookupsPresenter = new LookupsPresenter();

  useEffect(() => {
    async function load() {
      await lookupsPresenter.loadUserLookups((generatedViewModel) => {
        const userRole = getDefaultRoleForUser(generatedViewModel.applicableUserRole ?? []);
        console.log('lookup', generatedViewModel);
        setLocationLabel(userRole);
      });

      await membersPresenter.load((generatedViewModel) => {
        copyViewModelToStateModel(generatedViewModel);
      });
    }
    load();
  }, []);

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
                Mandalam
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell capitalize"
              >
                Area
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Panchayat
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {vm &&
              vm.map((memberVm, index) => {
                return <MemberRowComponent key={index} vm={memberVm} index={index} />;
              })}

            {vm.length === 0 && (
              <td colSpan={4} className="py-3.5 pl-4 text-center text-lg">
                Data not available
              </td>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
