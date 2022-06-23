import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import UserPresenter from '../components/user/user.presenter'
import CounterWidget from '../components/dashboard/counter-widget.component'
import UserList from '../components/user/user-list/user-list.component'

export default function Home() {
  
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [stateViewModel, copyViewModelToStateViewModel] = useState(null);
  const vm = {
    title: 'Counter',
    countValue: '24,600',
  };

  let userPresenter = new UserPresenter();
  
   let handleGetUser = async () => {
    await userPresenter.getUser(viewModel => {
        copyViewModelToStateViewModel(viewModel)
    });
   }

  useEffect(() =>{
    const token = localStorage.getItem('token')
    if(token) {
       setLoginStatus(true)
    } else {
       Router.push("/login")
    }
  },[])

 return (<>
      <Head> 
        <title >Home Page</title>
      </Head>
      <h1 data-testid="pageheader" className="p-4 text-3xl font-bold underline">
        {isLoggedIn ? 'You are logged in' : 'You are not logged in'}
      </h1>
      {isLoggedIn}
      <nav className="py-4 px-6 text-sm font-medium">
        <ul className="flex space-x-3">
          <li>
           {!isLoggedIn && (<Link href="/login">
                <a className="block px-3 py-2 rounded-md bg-sky-500 text-white"> Login
                </a>
            </Link>)
           }     
          </li>
          <li>
              {isLoggedIn && (
                <button onClick={handleGetUser} className="block px-3 py-2 rounded-md bg-sky-500 text-white"> User Details
                </button>
             )}
          </li>
          <li>
              {isLoggedIn && (<Link href="/logout">
                <a className="block px-3 py-2 rounded-md bg-sky-500 text-white"> Logout
                </a>
             </Link>)}
          </li>

        </ul>
       </nav>
       <dl className="px-2 mt-5 grid grid-cols-2 gap-5 sm:grid-cols-6">
        <CounterWidget vm={vm} color="red" />
        <CounterWidget vm={vm} color="orange" />
        <CounterWidget vm={vm} color="blue" />
       </dl>
      
      User details: 
      { JSON.stringify(stateViewModel,null,2) }

       <UserList></UserList>
    </>
  )
}