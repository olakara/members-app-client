import { useState, useEffect } from 'react';
import Head from 'next/head';
import UserPresenter from '../components/user/user.presenter';
import HeaderComponent from '../components/common/header.component';
import DashboardComponent from '../components/dashboard/dashboard.component';
import ActionButtonComponent from '../components/common/action-button.component';

export default function Home() {
  const userPresenter = new UserPresenter();

  const [isAbleToCreateMember, setAbleToCreateMember] = useState(false);
  const [isAbleToManageDispute, setAbleToManageDispute] = useState(false);
  const [isDistrictAdmin, setIsDistrictAdmin] = useState(false);
  const [canAddMember, setCanAddMemeber] = useState(false);
  const [canAddAgent, setCanAddAgent] = useState(false);

  useEffect(() => {
    async function load() {
      await userPresenter.getCurrentUser((generatedViewModel) => {
        const userRole = generatedViewModel.role;
        if (userRole === 'mandalam-agent' || userRole === 'district-agent') setAbleToCreateMember(true);
        else setAbleToCreateMember(false);

        if (userRole === 'dispute-committee' || userRole === 'mandalam-agent' || userRole === 'district-agent')
          setAbleToManageDispute(true);
        else setAbleToManageDispute(false);

        if (userRole === 'district-admin') setIsDistrictAdmin(true);
        else setIsDistrictAdmin(false);
      });
      userPresenter.canUserAddMember((result) => {
        setCanAddMemeber(result);
      });
      userPresenter.canUserAddAgent((result) => {
        setCanAddAgent(result);
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

      <div className="py-10">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isAbleToCreateMember && <ActionButtonComponent action="/view-members">View Members</ActionButtonComponent>}

          {isAbleToCreateMember && canAddMember && (
            <ActionButtonComponent action="/create-member">Add Member</ActionButtonComponent>
          )}

          {!isAbleToCreateMember && !isAbleToManageDispute && (
            <ActionButtonComponent action="/view-agents">
              {isDistrictAdmin && 'View Agents'}
              {!isDistrictAdmin && 'View Users'}
            </ActionButtonComponent>
          )}

          {!isAbleToCreateMember && !isAbleToManageDispute && canAddAgent && (
            <ActionButtonComponent action="/create-agent">
              {isDistrictAdmin && 'Add Agent'}
              {!isDistrictAdmin && 'Add User'}
            </ActionButtonComponent>
          )}

          {isAbleToManageDispute && (
            <ActionButtonComponent action="/view-disputes">View Disputes</ActionButtonComponent>
          )}
        </main>
      </div>
    </>
  );
}
