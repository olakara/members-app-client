import Head from 'next/head';
import HeaderComponent from '../../components/common/header.component';
import AgentsComponent from '../../components/agent/agents.component';
function ViewAgentsPage() {
  return (
    <>
      <Head>
        <title>View Disputes</title>
      </Head>
      <HeaderComponent />
      <AgentsComponent></AgentsComponent>
    </>
  );
}

export default ViewAgentsPage;
