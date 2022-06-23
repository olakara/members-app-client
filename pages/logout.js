import {  useEffect } from 'react';
import Router from "next/router"
import UserPresenter from "../components/user/user.presenter"

export default function Logout(){

   useEffect(() =>{
    let userPresenter = new UserPresenter();
    userPresenter.signOut();
    Router.push("/");
  },[])
    
    return(<>
       You successfully logged out.
    </>)
}