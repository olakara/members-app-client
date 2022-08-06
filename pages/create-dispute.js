import { useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import UserPresenter from '../components/user/user.presenter';
import HeaderComponent from '../components/common/header.component';

export default function CreateDisputePage() {
  let userPresenter = new UserPresenter();

  const { query, isReady } = useRouter();

  useEffect(() => {
    if (!isReady) return;
    let id = query.id;
  }, [isReady]);

  return (
    <>
      <Head>
        <title>Create Dispute page</title>
      </Head>
      <HeaderComponent />
      <div>Dispute! This person is already registered. Please use the dispute form to create a dispute</div>
    </>
  );
}
