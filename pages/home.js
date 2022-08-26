import { useState, useEffect } from 'react';
import Head from 'next/head';
import UserPresenter from '../components/user/user.presenter';
import HeaderComponent from '../components/common/header.component';
import AgentsComponent from '../components/agent/agents.component';
import MembersComponent from '../components/member/members.component';
import DashboardComponent from '../components/dashboard/dashboard.component';
import DisputesComponent from '../components/dispute/disputes.component';

export default function Home() {
  const userPresenter = new UserPresenter();

  const [isAbleToCreateMember, setAbleToCreateMember] = useState(false);
  const [isAbleToManageDispute, setAbleToManageDispute] = useState(false);

  useEffect(() => {
    async function load() {
      await userPresenter.getCurrentUser((generatedViewModel) => {
        const userRole = generatedViewModel.role;
        if (userRole === 'mandalam-agent' || userRole === 'district-agent') setAbleToCreateMember(true);
        else setAbleToCreateMember(false);

        if (userRole === 'dispute-committee') setAbleToManageDispute(true);
        else setAbleToManageDispute(false);
      });
    }
    load();
  }, []);

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <HeaderComponent />

      <DashboardComponent></DashboardComponent>

      {!isAbleToCreateMember && !isAbleToManageDispute && <AgentsComponent></AgentsComponent>}

      {isAbleToCreateMember && <MembersComponent></MembersComponent>}

      {isAbleToManageDispute && <DisputesComponent></DisputesComponent>}
    </>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Example() {
  return <div className="w-full max-w-md px-2 py-16 sm:px-0"></div>;
}
