import { useState } from 'react';
import classNames from 'classnames';
import UserRow from './user-row';

export default function UserList(props) {

   let widgetStyles = classNames({
      'px-4 py-5 bg-gradient-to-tl shadow-md rounded-lg overflow-hidden sm:p-6': true,
      'from-red-400 to-pink-400' : props.color === 'red',
      'from-orange-400 to-yellow-400' : props.color === 'orange',
      'from-blue-400 to-emerald-400' : props.color === 'blue',
   })

   const [users, setUsers] = useState([
        { id: 1, firstName: 'Frank', lastName: 'Murphy', email: 'frank.murphy@test.com', isActive: true },
        { id: 2, firstName: 'Vic', lastName: 'Reynolds', email: 'vic.reynolds@test.com', isActive: false },
        { id: 3, firstName: 'Gina', lastName: 'Jabowski', email: 'gina.jabowski@test.com', isActive: false },
        { id: 4, firstName: 'Jessi', lastName: 'Glaser', email: 'jessi.glaser@test.com', isActive: true },
        { id: 5, firstName: 'Jay', lastName: 'Bilzerian', email: 'jay.bilzerian@test.com', isActive: true }
    ]);

   

 return (
    <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name
                  </th>
                  <th scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Title
                  </th>
                  <th scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Email
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">

                {users && users.map((user, index) =>
                        <UserRow key={index} vm={user} index={index}  />
                )}
               
              </tbody>
            </table>
          </div>
    
  )
}