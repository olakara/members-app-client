import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import HeaderComponent from '../components/common/header.component'
import AgentListComponent from '../components/agent/agent-list/agent-list.component'

export default function Home() {
  
  
 return (<>
      <Head> 
        <title >Home Page</title>
      </Head>

      <HeaderComponent/>
      
       {/* <dl className="px-2 mt-5 grid grid-cols-2 gap-5 sm:grid-cols-6">
        <CounterWidget vm={vm} color="red" />
        <CounterWidget vm={vm} color="orange" />
        <CounterWidget vm={vm} color="blue" />
       </dl> */}


      <div className="py-10">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">    
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">    
              <div className="ml-4 mt-2">
                <h1 className="text-3xl font-bold leading-tight text-gray-900">Users</h1>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <Link href="/create-agent">
                    <a className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Add User
                    </a>
                </Link>
              </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AgentListComponent></AgentListComponent>
        </main>
      </div>
    </>
  )
}