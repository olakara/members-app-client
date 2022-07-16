import classNames from 'classnames';

export default function MemberRowComponent(props) {
  let rowStyle = classNames({
    'bg-gray-50': props.index % 2 !== 0,
  });

  return (
    <tr className={rowStyle}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {props.vm.fullName}
      </td>
      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">{props.vm.area}</td>
      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">{props.vm.mandalam}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{props.vm.panchayat}</td>
    </tr>
  );
}
