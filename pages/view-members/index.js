import Head from 'next/head';
import HeaderComponent from '../../components/common/header.component';
import MembersComponent from '../../components/member/members.component';
function ViewMembersPage() {
  return (
    <>
      <Head>
        <title>View Members</title>
      </Head>
      <HeaderComponent />
      <MembersComponent></MembersComponent>
    </>
  );
}

export default ViewMembersPage;
