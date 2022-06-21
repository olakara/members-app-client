import {  useEffect } from 'react';
import Head from 'next/head'
import Router from "next/router"

export default function Home() {


  useEffect(() =>{
    const token = localStorage.getItem('token');

    if(token) {
       Router.push("/home");
    } else {
      Router.push("/login");
    }
   
  },[])

 return (<>
      <Head> 
        <title >Index Page</title>
      </Head>
    
      <div>Loading...</div>
    </>
  )
}
