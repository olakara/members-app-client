import { useEffect, useState } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import HeaderComponent from '../components/common/header.component';
import AgentsPresenter from '../components/agent/agents.presenter';
import FormErrorComponent from '../components/common/form-error.component';
import { isEmailValid } from '../shared/utilities';
import Spinner from '../components/common/spinner';

function PasswordResetByAdminPage() {
  const router = useRouter();
  const {
    query: { id, r },
  } = router;

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const agentPresenter = new AgentsPresenter();

  useEffect(() => {
    setEmail(r);
  }, [r]);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const agentDto = {
      id: id,
      email: email,
    };
    await agentPresenter.resetPassword(
      agentDto,
      (success) => {
        console.log(success);
        Router.push('/home');
      },
      (error) => {
        setErrorMessage(error.data.reason);
        setIsLoading(false);
      }
    );
  };
  return (
    <>
      <Head>
        <title>Password Reset</title>
      </Head>

      <HeaderComponent></HeaderComponent>
      {isLoading && <Spinner isMessageNeeded={true} />}
      <div className="py-10">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Reset Password for User</h1>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0"></div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-md italic text-gray-700 mt-3">
            You are about to reset password for this user! <br />
            Please note that the new password will be sent to below email. This email will be registered under the user
            and he/she will login using this email.
          </div>
          {errorMessage && <FormErrorComponent vm={errorMessage} />}

          <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleResetPassword}>
            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Email Address (Login) <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  id="cancel-button"
                  title="Cancel"
                  type="button"
                  onClick={() => {
                    router.push('/home');
                  }}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  id="submit-button"
                  title="Save"
                  type="submit"
                  disabled={!(email && isEmailValid(email))}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default PasswordResetByAdminPage;
