import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MemberPresenter from '../components/member/members.presenter';
import HeaderComponent from '../components/common/header.component';

export default function CreateDisputePage() {
  const memberPresenter = new MemberPresenter();

  const { query, isReady } = useRouter();

  useEffect(() => {
    async function load() {
      await memberPresenter.get
    }

    if (!isReady) return;
    let id = query.id;
    load(id);
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
