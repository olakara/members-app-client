import Link from 'next/link';
import classNames from 'classnames';
import MembersPresenter from '../members.presenter';

export default function MemberRowComponent(props) {
  let rowStyle = classNames({
    'bg-gray-50': props.index % 2 !== 0,
  });

  const membersPresenter = new MembersPresenter();

  const handleDownload = async (event) => {
    event.preventDefault();
    await membersPresenter.downloadReceipt(props.vm.id, props.vm.membershipId);
  };

  return (
    <>
      <tr className={rowStyle}>
        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
          {props.vm.membershipId}
        </td>
        <td className="overflow-wrap: break-word py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
          {props.vm.fullName}
        </td>
        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">{props.vm.panchayat}</td>
        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">{props.vm.mobile}</td>
        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">{props.vm.agent}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
          <div className="grid grid-cols-3 content-start">
            <div>
              {props.actions.view && (
                <Link className="mr-2" href={`/view-dispute/${props.vm.id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </Link>
              )}
              {props.actions.print && (
                <button onClick={handleDownload}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
