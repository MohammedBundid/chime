
import { useState } from 'react';
import backgroundImage from '../assets/chime-home-vector-dark-mode.svg';
import regLogoImage from '../assets/chime-logo-reg-small.svg';
import { useAuth } from '../hooks/useAuth';


const Login = () => {

    const { Userlogin, loading, error } = useAuth()

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (e, creds) => {
        e.preventDefault()
        Userlogin(creds)
    }

    const handleInput = (e) => {
        const {name, value} = e.target

        setCredentials((prev) => ({
            ...prev, 
            [name]:value
        }))
    }
    
  return (
    <div className="bg-background">
    <div className="flex justify-center h-screen">
        <div className="hidden lg:block lg:w-2/3 h-full bg-background select-none" >
            <img src={backgroundImage} alt="chime home-vector" draggable={false} className='w-full h-full' />
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
                <div className="w-full h-10 mb-4">
                    <p className='text-red-300 capitalize font-semibold text-balance text-center'>{error}</p>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-14 select-none" draggable={false} src={regLogoImage} alt="chime home-vector" />
                    </div>

                    <p className="mt-3 text-text">Sign in to access your account</p>
                </div>

                <div className="mt-8">
                    <form onSubmit={(e) => handleSubmit(e, credentials)}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder="example@example.com" 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                value={credentials.email} 
                                onChange={handleInput} 
                            />
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                            </div>

                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Your Password" 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                value={credentials.password} 
                                onChange={handleInput} 
                            />
                        </div>

                        <div className="mt-6">
                            <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50" disabled={loading}>
                                {loading ? 'signing in ....' : 'sign in'}
                            </button>
                        </div>

                    </form>

                    <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="/signup" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.</p>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login