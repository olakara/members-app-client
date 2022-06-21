import { useState } from 'react';
import Router from "next/router"
import UserPresenter from "../components/user/user.presenter"

export default function Login(){

    let userPresenter = new UserPresenter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let [isLoginFail, setLoginStatus] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()
         let result = await userPresenter.signIn(email,password)
        if(result) {
                console.log('Login success, redirect to dashboard ..');
                Router.push("/home")
        } else {
                setLoginStatus(true);
                console.log('show error')
        }
    }

    return(<>
    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img className="h-12 w-auto" src="./images/Logo.jpg" alt="Logo" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-8">
          <div className="mt-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor ="email" className="block text-sm font-medium text-gray-700"> Email address </label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" autoComplete="email" required
                    onKeyUp={e => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor ="password" className="block text-sm font-medium text-gray-700"> Password </label>
                <div className="mt-1">
                  <input id="password" name="password" type="password" autoComplete="current-password" required
                     onKeyUp={e => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-green-600 hover:text-green-500"> Forgot your password? </a>
                </div>
              </div>

              { isLoginFail && 
               <div className="flex items-center justify-between">
                <div className="flex items-center text-red-500">Invalid credentials! Please check the username & password!</div>
              </div>}

              <div>
                <button type="submit" disabled={!email || !password} 
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                 
                    Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="hidden lg:block relative w-0 flex-1">
      <img className="absolute inset-0 h-full w-full object-cover"
        src="http://www.kmccabudhabi.org/wp-content/uploads/2020/05/home-bannner-1.jpg"
        alt="KMCC Image" />
    </div>
    </>);
   
}
