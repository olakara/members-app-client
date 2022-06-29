import { useEffect, useState } from "react"
import Head from 'next/head'
import Router from 'next/router'
import LookupsPresenter from  '../shared/lookups/lookups.presenter'
import HeaderComponent from '../components/common/header.component'
import AgentsPresenter from '../components/agent/agents.presenter'
import FormErrorComponent from "../components/common/form-error.component"

export default function CreateAgentPage() {

    const [userLookups, copyUserLookupsToStateViewModel] = useState(null);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [alternateMobile, setAlternateMobile] = useState('');
    const [designation, setDesignation] = useState('');
    const [location, setLocation] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [locationLabel, setLocationLabel] = useState('');
    const [isLocationNeeded, setIsLocationNeeded] = useState(true);
    

    const agentPresenter = new AgentsPresenter();    
    const lookupsPresenter = new LookupsPresenter();
    
    useEffect(() => {
        async function load() {
          await lookupsPresenter.loadUserLookups(generatedViewModel => {
              copyUserLookupsToStateViewModel(generatedViewModel)
              const userRole = getDefaultRoleForUser(generatedViewModel.applicableUserRole ?? []);
              setRole(userRole)
              setLocationLabel(getLocationLabel(userRole))
          })
        }
        load();
    },[])

    function getDefaultRoleForUser(applicableUserRoles) {
      if(applicableUserRoles && applicableUserRoles.includes('state-admin')) {
        return 'state-admin';
      }

      return applicableUserRoles.length > 0 ? applicableUserRoles[0] : "";
    }

    function getLocationLabel(roleName) {
      const roleSplitArray = roleName.split("-");
      return roleSplitArray[0];
    }

    function setLocationNeeded(newRole) {
      if(newRole === 'state-admin' || newRole === 'district-admin' || newRole === 'mandalam-admin') {
        setIsLocationNeeded(true)
      } else {
        setIsLocationNeeded(false)
      }
    }

    const handleSubmit = async(e) => {
      e.preventDefault()

      let agentDto = {
        fullName,
        email,
        mobile,
        alternateMobile,
        designation,
        role,
        location
      };
      
      await agentPresenter.createAgent(agentDto, success => {
        Router.push('/home');
      }, error => {
        setErrorMessage(error.data.reason);
      });
      
    }
    
    return (
        <>
          <Head>
              <title>Create User</title>
          </Head>
          <HeaderComponent/>
          <div className="py-10">
               <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">    
                <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">    
                    <div className="ml-4 mt-2">
                      <h1 className="text-3xl font-bold leading-tight text-gray-900">Create User</h1>
                    </div>
                </div>
              </header>
               <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {errorMessage && ( <FormErrorComponent vm={errorMessage}/>)}
                  <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
                    <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                      <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Full Name
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="fullName" id="fullName" autoComplete="given-name"
                              value={fullName} onChange={ e=> setFullName(e.target.value)}
                              className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                          </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Email (Login)
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="email" name="email" id="email" autoComplete="email"
                              value={email} onChange={ e=> setEmail(e.target.value)}
                              className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                          </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Mobile Number
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="mobile" id="mobile" autoComplete="mobile"
                              value={mobile} onChange={ e=> setMobile(e.target.value)}
                              className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                          </div>
                        </div>

                         <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label htmlFor="alternateMobile" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Alternate Mobile
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="alternateMobile" id="alternateMobile" autoComplete="alternateMobile"
                              value={alternateMobile} onChange={ e=> setAlternateMobile(e.target.value)}
                              className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                          </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label htmlFor="designation" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Designation
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="designation" id="designation" autoComplete="designation"
                              value={designation} onChange={ e=> setDesignation(e.target.value)}
                              className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                          </div>
                        </div>

                         <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label htmlFor="role" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Role
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <select id="role" name="role" autoComplete="role"
                              value={role} onChange={ e=> { 
                                setRole(e.target.value) 
                                setLocationNeeded(e.target.value);
                              }}
                              className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                <option value="">Select</option>
                              { userLookups && userLookups.applicableUserRole && userLookups.applicableUserRole.map( role => {
                                return (<option key={role} value={role}>{role}</option>)
                              })}
                            </select>
                          </div>
                        </div>

                        {isLocationNeeded && (
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 capitalize"> {locationLabel}
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <select id="location" name="location" autoComplete="location"
                              value={location} onChange={ e=> setLocation(e.target.value)}
                              className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                <option value="">Select</option>
                              { userLookups && userLookups.cascadeData && userLookups.cascadeData.map( location => {
                                return (<option key={location.id} value={location.id}>{location.description}</option>)
                              })}
                            </select>
                          </div>
                        </div>
                      )}    
                      </div>
                    </div>
                    <div className="pt-5">
                      <div className="flex justify-end">
                        <button type="button"
                          onClick={ () => {
                            Router.push('/home')
                          }}
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Cancel</button>
                        <button type="submit" disabled={!fullName || !email || !mobile || !location || (isLocationNeeded && !role)} 
                          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Save</button>
                      </div>
                    </div>
                  </form>
               </main>
          </div>
        </>
    )
}