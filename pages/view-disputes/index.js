import Head from 'next/head';
import HeaderComponent from '../../components/common/header.component';
import DisputesComponent from '../../components/dispute/disputes.component';
function ViewDisputesPage() {
  return (
    <>
      <Head>
        <title>View Disputes</title>
      </Head>
      <HeaderComponent />
      <DisputesComponent></DisputesComponent>
    </>
  );
}

export default ViewDisputesPage;
