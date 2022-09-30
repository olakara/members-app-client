import VerificationFormComponent from './verification-form/verification-form.component';

function VerficationHomeComponent() {
  return (
    <>
      <div className="py-10">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Verify Member</h1>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VerificationFormComponent></VerificationFormComponent>
        </main>
      </div>
    </>
  );
}

export default VerficationHomeComponent;
