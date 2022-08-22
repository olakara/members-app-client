import Link from 'next/link';
import classNames from 'classnames';

function DisputeRowComponent(props) {
  let rowStyle = classNames({
    'bg-gray-50': props.index % 2 !== 0,
  });

  const handleViewDispute = async (event) => {
    event.preventDefault();
  };

  return (
    <>
      <tr className={rowStyle}>
        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
          {props.vm.membershipNo}
        </td>
        <td className="overflow-wrap: break-word py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
          {props.vm.fullName}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">{props.vm.location}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
          <Link href={`/view-dispute/${props.vm.id}`}>
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
          </Link>
        </td>
      </tr>
    </>
  );
}

export default DisputeRowComponent;
