import { getDateInRegionalFormat } from '../../shared/utilities';
import ImagePreviewComponent from '../common/image-preview.component';
import { config } from '../../shared/constants';
import Link from 'next/link';

function MemberDetailsComponent({ member }) {
  const downloadUrl = config.BASE_URL + 'memberview/member-view/';
  return (
    <>
      <div className="py-10">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Member Details</h1>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <div className="py-2 overflow-hidden shadow-md sm:rounded-lg bg-slate-100">
            <div className="flex flex-row">
              <div className="px-4 basis-1/2 py-2">
                <h3 className=" text-lg font-medium leading-6 text-gray-900">Emirates ID Front</h3>
                <ImagePreviewComponent vm={downloadUrl + member?.emiratesIdFrontPage} />
              </div>
              <div className="px-4 basis-1/2 py-2">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Emirates ID Back</h3>
                <ImagePreviewComponent vm={downloadUrl + member?.emiratesIdLastPage} />
              </div>
            </div>

            <div className="mt-5 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Membership Number</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.membershipId}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.fullName}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Emirates ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.emiratesIdNumber}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date of Expiry</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {getDateInRegionalFormat(member?.emiratesIdExpiry)}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.mobileNumber}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {getDateInRegionalFormat(member?.dateOfBirth)}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">State</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">KERALA</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">District</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.district.name}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Mandalam</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.mandalam.name}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Panchayath</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.panchayat.name}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">State</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.state.name}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Area</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.area.name}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Join Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {getDateInRegionalFormat(member?.createdAt)}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Agent Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{member?.agent}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Passport</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <a
                      href={downloadUrl + member?.passportFrontPage}
                      className="mx-3 underline text-green-600 hover:text-green-800 visited:text-purple-600"
                    >
                      Front Page
                    </a>
                    <a
                      href={downloadUrl + member?.passportLastPage}
                      className="mx-3 underline text-green-600 hover:text-green-800 visited:text-purple-600"
                    >
                      Back Page
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default MemberDetailsComponent;
