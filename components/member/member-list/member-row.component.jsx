import classNames from 'classnames';
import Link from 'next/link';

export default function MemberRowComponent(props) {
  let rowStyle = classNames({
    'bg-gray-50': props.index % 2 !== 0,
  });

  return (
    <tr className={rowStyle}>
      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
        {props.vm.membershipId}
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{props.vm.fullName}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">{props.vm.panchayat}</td>
      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">{props.vm.mobile}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div className="grid grid-cols-3 content-start">
          <div>
            <Link href="/">
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
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </Link>
          </div>
          <div>
            <Link href="/">
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
            </Link>
          </div>
        </div>
      </td>
    </tr>
  );
}
