import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import HeaderComponent from '../../components/common/header.component';
import MemberDetailsComponent from '../../components/member/member-details.component';
import MembersPresenter from '../../components/member/members.presenter';
function ViewMemberPage(props) {
  const membersPresenter = new MembersPresenter();
  const [member, setMember] = useState(null);
  const { query, isReady } = useRouter();

  const load = async (id) => {
    await membersPresenter.getMemberViewerDetails(id, (memberDetails) => {
      setMember(memberDetails);
    });
  };

  useEffect(() => {
    if (!isReady) return;
    let id = query.id;
    load(id);
  }, [isReady]);

  return (
    <>
      <Head>
        <title>View Member Details</title>
      </Head>
      <HeaderComponent />
      <MemberDetailsComponent member={member}></MemberDetailsComponent>
    </>
  );
}

export default ViewMemberPage;
