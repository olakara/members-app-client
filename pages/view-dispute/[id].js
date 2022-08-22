import { useEffect, useState } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import MemberPresenter from '../../components/member/members.presenter';
import DisputePresenter from '../../components/dispute/disputes.presenter';
import FormErrorComponent from '../../components/common/form-error.component';
import { isEmptyObject } from '../../shared/utilities';
import HeaderComponent from '../../components/common/header.component';

function ViewDisputePage() {
  const memberPresenter = new MemberPresenter();
  const disputePresenter = new DisputePresenter();

  const [dispute, setDispute] = useState({
    status: '',
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
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function load(id) {
      await disputePresenter.getDispute(id, (disputeVm) => {
        console.log('Dispute info from server', disputeVm);
        setDispute(disputeVm);
      });
    }

    load(id);
  }, [id]);

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
          ID: {id} <br />
          {JSON.stringify(dispute)}
        </main>
      </div>
    </>
  );
}

export default ViewDisputePage;
