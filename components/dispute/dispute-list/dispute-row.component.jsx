import classNames from 'classnames';

function DisputeRowComponent(props) {
  let rowStyle = classNames({
    'bg-gray-50': props.index % 2 !== 0,
  });

  return (
    <>
      <tr className={rowStyle}>
        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
          {props.vm.membershipNo}
        </td>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{props.vm.fullName}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">{props.vm.location}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">Details</td>
      </tr>
    </>
  );
}

export default DisputeRowComponent;
