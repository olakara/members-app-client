import { useEffect, useState } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import MemberPresenter from '../components/member/members.presenter';
import UserPresenter from '../components/user/user.presenter';
import LookupsPresenter from '../shared/lookups/lookups.presenter';
import HeaderComponent from '../components/common/header.component';
import FormErrorComponent from '../components/common/form-error.component';
import { isEmptyObject } from '../shared/utilities';

export default function CreateDisputePage() {
  const memberPresenter = new MemberPresenter();
  const userPresenter = new UserPresenter();
  const lookupsPresenter = new LookupsPresenter();

  const [formData, setFormData] = useState({
    status: 'DRAFT',
    membershipNo: '',
    name: '',
    mobile: '',
    state: '',
    district: '',
    mandalam: '',
    panchayat: '',
    area: '',
    toMandalanm: '',
    toPanchayath: '',
    toArea: '',
    remarks: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { query, isReady } = useRouter();

  const [isMandalamAgent, setIsMandalamAgent] = useState(false);
  const [isDistrictAgent, setIsDistrictAgent] = useState(false);

  const [userLookups, copyUserLookupsToStateViewModel] = useState({});
  const [mandalamLookups, copyMandalamLookupsToStateViewModel] = useState({});
  const [panchayatLookups, copyPanchayatLookupsToStateViewModel] = useState({});

  const [districtIdOfAgent, setDistrictIdOfAgent] = useState('');
  const [mandalamIdOfAgent, setMandalamIdOfAgent] = useState('');

  useEffect(() => {
    async function load(eid) {
      await userPresenter.getCurrentUser((generatedViewModel) => {
        const userRole = generatedViewModel.role;
        if (userRole === 'mandalam-agent') setIsMandalamAgent(true);
        if (userRole === 'district-agent') setIsDistrictAgent(true);
      });

      await lookupsPresenter.loadUserLookups(async (generatedViewModel) => {
        if (generatedViewModel && isEmptyObject(generatedViewModel)) return;

        console.log('User Lookups', generatedViewModel);

        const { agentMandalamId, agentDistrictId } = generatedViewModel;
        setDistrictIdOfAgent(agentDistrictId);
        setMandalamIdOfAgent(agentMandalamId);
        copyUserLookupsToStateViewModel(generatedViewModel);

        await lookupsPresenter.loadMandalams(agentDistrictId, (mandalamsViewModel) => {
          copyMandalamLookupsToStateViewModel(mandalamsViewModel);
        });

        await lookupsPresenter.loadPanchayaths(agentMandalamId, (panchayathsViewModel) => {
          copyPanchayatLookupsToStateViewModel(panchayathsViewModel);
        });

        await memberPresenter.getDisputeInfoForMember(eid, (disputeInfo) => {
          if (disputeInfo && isEmptyObject(disputeInfo)) return;
          if (!disputeInfo.isDispute) return;

          const { member } = disputeInfo;

          let formInitData = {
            id: member.id,
            status: 'DRAFT',
            membershipNo: member.membershipId,
            name: member.fullName,
            mobile: member.mobileNumber,
            state: member.state.name,
            district: member.district.name,
            mandalam: member.mandalam.name,
            mandalamId: member.mandalam.id,
            panchayat: member.panchayat.name,
            panchayatId: member.panchayat.id,
            area: member.area.name,
            toMandalam: agentMandalamId,
            toPanchayath: null,
            toArea: null,
            remarks: null,
          };
          setFormData(formInitData);
        });
      });
    }

    if (!isReady) return;
    let id = query.id;
    load(id);
  }, [isReady]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await memberPresenter.createDispute(formData, (success) => {
      Router.push('/home');
    }),
      (error) => {
        setErrorMessage(error.data.reason);
      };
  };

  return (
    <>
      <Head>
        <title>Create Dispute page</title>
      </Head>
      <HeaderComponent />
      <div className="py-10">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Create Dispute</h1>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {errorMessage && <FormErrorComponent vm={errorMessage} />}
          <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Status
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={formData.status}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Membership Details</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Current membership details of the member are as follows:
                </p>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Membership No</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={formData.membershipNo}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Name</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={formData.name}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Mobile</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={formData.mobile}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">State</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={formData.state}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">District</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={formData.district}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Mandalam</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={formData.mandalam}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Panchayath</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={formData.panchayat}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Area</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={formData.area}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Change Details</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Change membership details to the following:</p>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    State
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={userLookups && userLookups.stateName}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    District
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={userLookups && userLookups.districtsName}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="mandalam" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Mandalam <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select
                      id="mandalam"
                      name="mandalam"
                      autoComplete="mandalam"
                      disabled={!isDistrictAgent}
                      onChange={async (e) => {
                        setFormData({ ...formData, toMandalam: e.target.value });
                        await lookupsPresenter.loadPanchayaths(e.target.value, (generatedViewModel) => {
                          copyPanchayatLookupsToStateViewModel(generatedViewModel);
                        });
                      }}
                      value={formData.toMandalam}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      {mandalamLookups &&
                        mandalamLookups.mandalams &&
                        mandalamLookups.mandalams.map((org, index) => {
                          return (
                            <option key={index} value={org.id}>
                              {org.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Panchayath / Municipality <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select
                      id="toPanchayath"
                      name="toPanchayath"
                      autoComplete="toPanchayath"
                      onChange={(e) => {
                        setFormData({ ...formData, toPanchayath: e.target.value });
                      }}
                      value={formData.toPanchayath}
                      className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                      {<option value="">Select</option>}
                      {panchayatLookups &&
                        panchayatLookups.panchayaths &&
                        panchayatLookups.panchayaths.map((org, index) => {
                          return (
                            <option key={index} value={org.id}>
                              {org.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                  <label htmlFor="toArea" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Area <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select
                      id="toArea"
                      name="toArea"
                      autoComplete="toArea"
                      onChange={(e) => {
                        setFormData({ ...formData, toArea: e.target.value });
                      }}
                      value={formData.toArea}
                      className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      {userLookups &&
                        userLookups.areas &&
                        userLookups.areas.map((org, index) => {
                          return (
                            <option key={index} value={org.id}>
                              {org.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Remarks
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      onChange={(e) => {
                        setFormData({ ...formData, remarks: e.target.value });
                      }}
                      value={formData.remarks}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  id="cancel-button"
                  title="Cancel"
                  type="button"
                  onClick={() => {
                    Router.push('/home');
                  }}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>

                <button
                  id="submit-button"
                  title="Save"
                  type="submit"
                  disabled={
                    !formData.toArea ||
                    !formData.toMandalam ||
                    !formData.toPanchayath ||
                    (formData.toMandalam === formData.mandalamId && formData.toPanchayath === formData.panchayatId)
                  }
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
