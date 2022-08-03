import { useState, useEffect } from 'react';
import Head from 'next/head';

import UserPresenter from '../components/user/user.presenter';
import HeaderComponent from '../components/common/header.component';
import CounterWidget from '../components/dashboard/counter-widget';
import AgentsComponent from '../components/agent/agents.component';
import MembersComponent from '../components/member/members.component';

export default function Home() {
  const userPresenter = new UserPresenter();

  const [isAbleToCreateMember, setAbleToCreateMember] = useState(false);
  const [vm, setVm] = useState({ title: 'Test Environment', countValue: '1234' });
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

      <div className="py-10">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="px-2 mt-5 grid grid-cols-2 gap-5 sm:grid-cols-6">
            <CounterWidget vm={vm} color="red" />
            <CounterWidget vm={vm} color="orange" />
            <CounterWidget vm={vm} color="blue" />
          </dl>
        </main>
      </div>

      {!isAbleToCreateMember && <AgentsComponent></AgentsComponent>}

      {isAbleToCreateMember && <MembersComponent></MembersComponent>}
    </>
  );
}
