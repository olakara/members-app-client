import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
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

      {!isAbleToCreateMember && <AgentsComponent></AgentsComponent>}

      <div className="py-10">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tab.Group>
            <Tab.List className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 border-b border-gray-200">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group',

                    selected ? 'border-green-600 active text-green-500' : 'text-gray-600'
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Members
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group',

                    selected ? 'border-green-600 active text-green-500' : 'text-gray-600'
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Disputes
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                {isAbleToCreateMember && <MembersComponent></MembersComponent>}
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                {isAbleToManageDispute && <DisputesComponent></DisputesComponent>}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </main>
      </div>
    </>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Example() {
  return <div className="w-full max-w-md px-2 py-16 sm:px-0"></div>;
}
