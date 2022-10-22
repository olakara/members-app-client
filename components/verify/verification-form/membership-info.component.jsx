import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
function MembershipInfoComponent({ member }) {
  return (
    <>
      <div className="px-4 py-2 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Member Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details.</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.fullName}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Emirates ID</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.emiratesId}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Date of Expiry</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.expiry}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.dob}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">State</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.state}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Passport</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <a
                // href={downloadUrl + member?.passportFrontPage}
                className="mx-3 underline text-green-600 hover:text-green-800 visited:text-purple-600"
              >
                Front Page
              </a>
              <a
                // href={downloadUrl + member?.passportLastPage}
                className="mx-3 underline text-green-600 hover:text-green-800 visited:text-purple-600"
              >
                Back Page
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}

export default MembershipInfoComponent;
