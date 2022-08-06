import Router from 'next/router';
import classNames from 'classnames';
import { useState } from 'react';
import { Switch } from '@headlessui/react';
import AgentsPresenter from '../agents.presenter';

export default function AgentRowComponent(props) {
  const [enabled, setEnabled] = useState(props.vm.isActive);
  const agentsPresenter = new AgentsPresenter();

  const handleToggle = async () => {
    const isEnable = !enabled;
    setEnabled(isEnable);
    if (isEnable) await agentsPresenter.activateAgent(props.vm.id);
    else await agentsPresenter.deactivateAgent(props.vm.id);
  };

  let rowStyle = classNames({
    'bg-gray-50': props.index % 2 !== 0,
  });

  const handleResetPassword = (event) => {
    event.preventDefault();
    Router.push({ pathname: '/password-reset-by-admin', query: { id: props.vm.id, r: props.vm.email } });
  };

  return (
    <tr className={rowStyle}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {props.vm.fullName} <span className="italic text-gray-600">({props.vm.role})</span>
      </td>
      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">{props.vm.email}</td>
      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">{props.vm.cascadeName}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <Switch
          checked={enabled}
          onChange={handleToggle}
          className={`${enabled ? 'bg-green-700' : 'bg-red-700'}
                    relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
        >
          <span className="sr-only">Enable Agent</span>
          <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
                        pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
      </td>
      <td>
        {props.vm.email !== 'admin@admin.com' && (
          <button title="Reset Password" onClick={handleResetPassword}>
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </button>
        )}
      </td>
    </tr>
  );
}
