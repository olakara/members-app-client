import { useEffect, useState } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import MemberPresenter from '../../components/member/members.presenter';
import DisputePresenter from '../../components/dispute/disputes.presenter';
import FormErrorComponent from '../../components/common/form-error.component';
import HeaderComponent from '../../components/common/header.component';

function ViewDisputePage() {
  const disputePresenter = new DisputePresenter();

  const [dispute, setDispute] = useState({});

  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    justification: '',
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function load(id) {
      await disputePresenter.getDispute(id, (disputeVm) => {
        console.log('Dispute info from server', disputeVm);
        setDispute(disputeVm);
        setFormData({ ...formData, id: disputeVm.id, justification: disputeVm.justificationComment });
      });
    }

    load(id);
  }, [id]);

  const handleReject = async (event) => {
    event.preventDefault();
    await disputePresenter.rejectDispute(
      formData,
      (success) => {
        Router.push('/home');
      },
      (error) => {
        setErrorMessage(error.data.reason);
      }
    );
  };

  const handleApprove = async (event) => {
    event.preventDefault();
    await disputePresenter.approveDispute(
      formData,
      (success) => {
        Router.push('/home');
      },
      (error) => {
        setErrorMessage(error.data.reason);
      }
    );
  };

  return (
    <>
      <Head>
        <title>Dispute Page</title>
      </Head>
      <HeaderComponent />
      <div className="py-10">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Dispute</h1>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {errorMessage && <FormErrorComponent vm={errorMessage} />}
          <div className="space-y-8 divide-y divide-gray-200">
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
                      value={dispute.statusText}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Membership Details</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Transfer from:</p>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Membership No</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={dispute.membershipNo}
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
                      value={dispute.fullName}
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
                      value={dispute.mobile}
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
                      value={dispute.fromState}
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
                      value={dispute.fromDistrict}
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
                      value={dispute.fromMandalam}
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
                      value={dispute.fromPanchayat}
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
                      value={dispute.fromArea}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Change Details</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Transfer to:</p>
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
                      value={dispute.toState}
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
                      value={dispute.toDistrict}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="mandalam" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Mandalam
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={dispute.toMandalam}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Panchayath / Municipality
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={dispute.toPanchayat}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                  <label htmlFor="toArea" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Area
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      disabled
                      value={dispute.toArea}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
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
                      disabled
                      value={dispute.reason}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Justification
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      type="text"
                      onChange={(e) => {
                        setFormData({ ...formData, justification: e.target.value });
                      }}
                      disabled={dispute.status}
                      value={formData.justification}
                      className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
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
                  id="reject-button"
                  title="Reject"
                  type="button"
                  onClick={handleReject}
                  disabled={dispute.status || (!formData.justification && !dispute.isCanApprove)}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reject
                </button>

                <button
                  id="approve-button"
                  title="Approve"
                  type="button"
                  onClick={handleApprove}
                  disabled={dispute.status || (!formData.justification && !dispute.isCanApprove)}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ViewDisputePage;
