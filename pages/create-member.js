import React, {useState} from "react";
import Head from 'next/head'
import Router from 'next/router'
import LookupsPresenter from  '../shared/lookups/lookups.presenter';
import HeaderComponent from '../components/common/header.component';
import FormErrorComponent from "../components/common/form-error.component"


export default function CreateMemberPage() {
    const [userLookups, copyUserLookupsToStateViewModel] = useState(null);

    const [location, setLocation] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [fullName, setFullName] = useState('');
    const [emiratesIdNumber, setEmiratesId] = useState('');
    const [emiratesIdExpiry, setEmiratesIdExpiry] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [mobile, setMobile] = useState('');
    const [alternateMobile, setAlternateMobile] = useState('');
    const [email, setEmail] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [passportExpiry, setPassportExpiry] = useState('');
    const [profession, setProfession] = useState('');
    const [qualification, setQualification] = useState('');
    const [bloodGroup, SetBloodGroup] = useState('');
    const [houseName, SetHouseName] = useState('');
    const [addressIndia, SetIndianAddress] = useState('');
    const [area, SetArea] = useState('');
    const [panchayat, SetPanchayat] = useState('');
    const [registeredOrganization, SetRegisteredOrganization] = useState('');
    const [welfareScheme, SetWelfareScheme] = useState('');

    const memberPresenter = new MemberPresenter();
    const lookupsPresenter = new LookupsPresenter();
    
    useEffect(() => {
        async function load() {
          await lookupsPresenter.loadUserLookups(generatedViewModel => {
              copyUserLookupsToStateViewModel(generatedViewModel)
              const userRole = getDefaultRoleForUser(generatedViewModel.applicableUserRole ?? []);
              setRole(userRole)
              
          })
        }
        load();
    },[])

    const handleSubmit = async(e) => {
      e.preventDefault()
       
    // create DTO
    // let memberDto = {};
      
    //   await memberPresenter.createMember(memberDto, success => {
    //     Router.push('/home');
    //   }, error => {
    //     setErrorMessage(error.data.reason);
    //   });
      
    }

    return (
       <>
        <Head>
              <title>Add Member</title>
        </Head>
        <HeaderComponent/>
        <div className="py-10">
               <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">    
                <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">    
                    <div className="ml-4 mt-2">
                      <h1 className="text-3xl font-bold leading-tight text-gray-900">Add Member</h1>
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
                          <label htmlFor="emiratesIdNumber" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Emirates ID
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="emiratesIdNumber" id="emiratesIdNumber" autoComplete="emirates-id"
                              value={emiratesIdNumber} onChange={ e=> setEmiratesId(e.target.value)}
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
    );
}