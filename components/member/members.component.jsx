import Link from 'next/link';
import MemberListComponent from './member-list/member-list.component';
function MembersComponent() {
  return (
    <div className="py-10">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Members</h1>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <Link href="/create-member">
              <a className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Add Member
              </a>
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MemberListComponent></MemberListComponent>
      </main>
    </div>
  );
}

export default MembersComponent;
