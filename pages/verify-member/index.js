import { useEffect, useState } from 'react';
import Head from 'next/head';
import HeaderComponent from '../../components/common/header.component';
import VerficationHomeComponent from '../../components/verify/verification-home.component';
import Spinner from '../../components/common/spinner';

export async function getServerSideProps(context) {
  return {
    props: {
      message: 'A test message!',
      data: {
        fullName: 'Jennie Nichols',
        emiratesId: '',
        dateOfExpiry: '',
        dateOfBirth: '',
        issuedPlace: '',
      },
    }, // will be passed to the page component as props
  };
}

function VerifyMemberPage() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Head>
        <title>Member Verification</title>
      </Head>
      <HeaderComponent />
      {isLoading && <Spinner isMessageNeeded={true} />}
      <VerficationHomeComponent></VerficationHomeComponent>
    </>
  );
}

export default VerifyMemberPage;
