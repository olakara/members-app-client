
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import UserPresenter from '../../components/user/user.presenter'


export default function HeaderComponent() {

    const [user, setCurrentUser] = useState({});
    const [isLoggedIn, setLoginStatus] = useState(false);

    let userPresenter = new UserPresenter();

     useEffect(() =>{
      
       async function loadCurrentUser() {
        await userPresenter.getCurrentUser(user => {
            setCurrentUser(user);
        });
        }
    
      if(userPresenter.isLoggedIn()) {
          setLoginStatus(true)
          loadCurrentUser();
      } else {
        Router.push("/login");
      }
  },[])

    return(
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="block lg:hidden h-8 w-auto" src="/images/logo.jpg" alt="Logo"/>
                            <img className="hidden lg:block h-8 w-auto" src="/images/logo.jpg" alt="Logo"/>
                        </div>
                    </div>
                 
                   
                    
                    <div className="flex flex-row">
                         <div className="mt-5 pr-3 capitalize">
                        {user.fullName}
                         </div>
                        <div className="mt-5"> 
                        {isLoggedIn && (<Link href="/logout" className="cursor-pointer">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" strokeWidth="1">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            
                        </Link>)} 
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}