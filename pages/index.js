import {  useEffect } from 'react';
import Head from 'next/head'
import Router from "next/router"
import UserPresenter from '../components/user/user.presenter'

export default function IndexPage() {

  let userPresenter = new UserPresenter();  

  useEffect(() =>{
    function load() {      
      if(userPresenter.isLoggedIn()) {
        Router.push("/home");
      } else {
        Router.push("/login");
      }
    }
   load();
  },[])

 return (<>
      <Head> 
        <title >Index Page</title>
      </Head>
    
      <div >
        Loading...
      </div>
    </>
  )
}


