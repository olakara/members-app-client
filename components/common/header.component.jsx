/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import UserPresenter from '../../components/user/user.presenter';
import HeaderLogoComponent from './header-logo.component';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function HeaderComponent() {
  const [user, setCurrentUser] = useState({});
  const [isLoggedIn, setLoginStatus] = useState(false);

  const [isAbleToCreateMember, setAbleToCreateMember] = useState(false);
  const [isAbleToManageDispute, setAbleToManageDispute] = useState(false);
  const [isDistrictAdmin, setIsDistrictAdmin] = useState(false);

  let userPresenter = new UserPresenter();

  useEffect(() => {
    async function loadCurrentUser() {
      await userPresenter.getCurrentUser((user) => {
        setCurrentUser(user);
        const userRole = user.role;
        if (userRole === 'mandalam-agent' || userRole === 'district-agent') setAbleToCreateMember(true);
        else setAbleToCreateMember(false);

        if (
          userRole === 'dispute-committee' ||
          userRole === 'mandalam-agent' ||
          userRole === 'district-agent' ||
          userRole === 'central-dispute-admin'
        )
          setAbleToManageDispute(true);
        else setAbleToManageDispute(false);

        if (userRole === 'district-admin') setIsDistrictAdmin(true);
        else setIsDistrictAdmin(false);
      });
    }

    if (userPresenter.isLoggedIn()) {
      setLoginStatus(true);
      loadCurrentUser();
    } else {
      Router.push('/login');
    }
  }, []);

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <HeaderLogoComponent></HeaderLogoComponent>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* Current: "border-green-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {/* active backup: "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium border-green-500 text-gray-900" */}
                  {isAbleToCreateMember && (
                    <>
                      <a
                        href="/view-members"
                        className="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        View Members
                      </a>
                      <a
                        href="/create-member"
                        className="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        Add Member
                      </a>
                    </>
                  )}
                  {!isAbleToCreateMember && !isAbleToManageDispute && (
                    <>
                      <a
                        href="/view-agents"
                        className="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        {isDistrictAdmin && 'View Agents'}
                        {!isDistrictAdmin && 'View Users'}
                      </a>
                      <a
                        href="/create-agent"
                        className="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        {isDistrictAdmin && 'Add Agent'}
                        {!isDistrictAdmin && 'Add User'}
                      </a>
                    </>
                  )}
                  {isAbleToManageDispute && (
                    <a
                      href="/view-disputes"
                      className="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Disputes
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  <div className="px-3">{user.fullName}</div>
                  <div>
                    {isLoggedIn && (
                      <Link href="/logout" className="cursor-pointer">
                        <a title="logout">
                          <ArrowRightOnRectangleIcon className="block h-6 w-6" aria-hidden="true" />
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-green-50 border-green-500 text-green-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              {/* active backup: block border-l-4 border-green-500 bg-green-50 py-2 pl-3 pr-4 text-base font-medium text-green-700 sm:pl-5 sm:pr-6 */}
              {isAbleToCreateMember && (
                <>
                  <Disclosure.Button
                    as="a"
                    href="/view-members"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                  >
                    View Members
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/create-member"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                  >
                    Add Member
                  </Disclosure.Button>
                </>
              )}
              {!isAbleToCreateMember && !isAbleToManageDispute && (
                <>
                  <Disclosure.Button
                    as="a"
                    href="/view-agents"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                  >
                    {isDistrictAdmin && 'View Agents'}
                    {!isDistrictAdmin && 'View Users'}
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/create-agent"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                  >
                    {isDistrictAdmin && 'Add Agent'}
                    {!isDistrictAdmin && 'Add User'}
                  </Disclosure.Button>
                </>
              )}
              {isAbleToManageDispute && (
                <Disclosure.Button
                  as="a"
                  href="/view-disputes"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Disputes
                </Disclosure.Button>
              )}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="/logout"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
