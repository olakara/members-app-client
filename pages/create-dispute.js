import { useEffect, useState } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import MemberPresenter from '../components/member/members.presenter';
import HeaderComponent from '../components/common/header.component';
import FormErrorComponent from '../components/common/form-error.component';
import { isEmptyObject } from '../shared/utilities';

export default function CreateDisputePage() {
  const memberPresenter = new MemberPresenter();

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
    toDistrict: '',
    toMandalanm: '',
    toPanchayath: '',
    toArea: '',
    remarks: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { query, isReady } = useRouter();

  useEffect(() => {
    async function load(eid) {
      await memberPresenter.getDisputeInfoForMember(eid, (disputeInfo) => {
        if (disputeInfo && isEmptyObject(disputeInfo)) return;

        if (!disputeInfo.isDispute) return;
        const { member } = disputeInfo;
        console.log('member', member);
        let formInitData = {
          status: 'DRAFT',
          membershipNo: member.membershipId,
          name: member.fullName,
          mobile: member.mobileNumber,
          state: member.state.name,
          district: member.district.name,
          mandalam: member.mandalam.name,
          panchayat: member.panchayat.name,
          area: member.area.name,
        };
        setFormData(formInitData);
      });
    }

    if (!isReady) return;
    let id = query.id;
    load(id);
  }, [isReady]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let disputeDto = {
      formData,
    };

    console.log(disputeDto);
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
                      disabled={true}
                      value={formData.status}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
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
                      disabled={true}
                      value={formData.membershipNo}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Name</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled={true}
                      value={formData.name}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Mobile</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled={true}
                      value={formData.mobile}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">State</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled={true}
                      value={formData.state}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">District</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled={true}
                      value={formData.district}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Mandalam</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled={true}
                      value={formData.mandalam}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Panchayath</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled={true}
                      value={formData.panchayat}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Area</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled={true}
                      value={formData.area}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Change Details</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Current membership details of the member are as follows:
                </p>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    District
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      autoComplete="given-name"
                      disabled={true}
                      value={formData.status}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Mandalam
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      autoComplete="given-name"
                      disabled={true}
                      value={formData.status}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Panchayath
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      autoComplete="given-name"
                      disabled={true}
                      value={formData.status}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Area
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      autoComplete="given-name"
                      disabled={true}
                      value={formData.status}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Remarks
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      autoComplete="given-name"
                      disabled={true}
                      value={formData.status}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
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
