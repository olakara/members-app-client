import { useState, useEffect } from 'react';
import Head from 'next/head';

import UserPresenter from '../components/user/user.presenter';
import HeaderComponent from '../components/common/header.component';
import AgentsComponent from '../components/agent/agents.component';
import MembersComponent from '../components/member/members.component';
import DashboardComponent from '../components/dashboard/dashboard.component';

export default function Home() {
  const userPresenter = new UserPresenter();

  const [isAbleToCreateMember, setAbleToCreateMember] = useState(false);

  useEffect(() => {
    async function load() {
      await userPresenter.getCurrentUser((generatedViewModel) => {
        const userRole = generatedViewModel.role;
        console.log('userRole', userRole);
        if (userRole === 'mandalam-agent' || userRole === 'district-agent') setAbleToCreateMember(true);
        else setAbleToCreateMember(false);
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

      {!isAbleToCreateMember && <AgentsComponent></AgentsComponent>}

      {isAbleToCreateMember && <MembersComponent></MembersComponent>}
    </>
  );
}
