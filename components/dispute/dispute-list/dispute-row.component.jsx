import Link from 'next/link';
import classNames from 'classnames';

function DisputeRowComponent(props) {
  let rowStyle = classNames({
    'bg-gray-50': props.index % 2 !== 0,
  });

  let approvalStyle = classNames('px-1 py-4 text-sm sm:table-cell', {
    'text-green-500': props.vm.status === 1,
    'text-red-500': props.vm.status === 2,
  });

  let approvalIcon = '';

  if (props.vm.status === 1) {
    approvalIcon = (
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
          d="M14.563 9.75a12.014 12.014 0 00-3.427 5.136L9 12.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }

  if (props.vm.status === 2) {
    approvalIcon = (
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
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }

  const actionIcon = props.vm.isCanApprove ? (
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
        d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );

  return (
    <>
      <tr className={rowStyle}>
        <td className={approvalStyle}>{approvalIcon}</td>
        <td className="overflow-wrap: break-word px-3 py-4 text-sm text-gray-500 sm:table-cell">
          {props.vm.membershipNo}
        </td>
        <td className="overflow-wrap: break-word py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
          {props.vm.fullName}
        </td>
        <td className="overflow-wrap: break-word px-3 py-4 text-sm text-gray-500 sm:table-cell">{props.vm.location}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
          <Link href={`/view-dispute/${props.vm.id}`}>{actionIcon}</Link>
        </td>
      </tr>
    </>
  );
}

export default DisputeRowComponent;
