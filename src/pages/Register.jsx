import { useState } from 'react';
import backgroundImage from '../assets/chime-home-vector-dark-mode.png';
import regLogoImage from '../assets/chime-logo-reg-small.svg';
import { useAuth } from '../hooks/useAuth';
import * as yup from 'yup'
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { UserRegister, loading, error } = useAuth()
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password: '' })

    let schema = yup.object().shape({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    });
    
    const setValidationErrors = (err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await schema.validate(credentials, { abortEarly: false });
            // console.log("Submitted credentials:", credentials); // Debug log
            await UserRegister(credentials);
            navigate('/')
        } catch (err) {
            setValidationErrors(err);
        }
    };
    

    const validateField = async (field, value) => {
        try {
            await schema.validateAt(field, { [field]: value });
            setErrors((prev) => ({ ...prev, [field]: '' }));
        } catch (err) {
            setErrors((prev) => ({ ...prev, [field]: err.message }));
        }
    };
    

    const handleInput = (e) => {
        const {name, value} = e.target

        setCredentials((prev) => ({...prev, [name]:value}))
    }
    
  return (
    <div className="bg-background">
    <div className="flex justify-center h-screen">
        <div className="hidden lg:block lg:w-2/3 h-full bg-background select-none" style={{ backgroundImage: `url(${backgroundImage})`,backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
            {/* <img src={backgroundImage} alt="chime home-vector" loading="lazy" fetchPriority='high' draggable={false} className='w-full h-full' /> */}
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
                <div className="w-full h-10 mb-4">
                    <p className='text-red-300 capitalize font-semibold text-balance text-center'>{error}</p>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-14 select-none" loading="lazy" fetchPriority='auto' draggable={false} src={regLogoImage} alt="chime home-vector" />
                    </div>

                    <p className="mt-3 text-text">Sign Up for a new Chime account</p>
                </div>

                <div className="mt-8">
                    <form role='form' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200" aria-label='email'>Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder="example@example.com" 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                value={credentials.email} 
                                onChange={handleInput} 
                                onBlur={() => validateField('email', credentials.email)}
                                required
                                aria-required
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && <p className="text-red-500 text-xs" aria-live="assertive">{errors.email}</p>}
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200" aria-label='password'>Password</label>
                            </div>

                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Your Password" 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                value={credentials.password} 
                                onChange={handleInput} 
                                onBlur={() => validateField('password', credentials.password)}
                                required
                                aria-required
                                aria-invalid={!!errors.password}
                            />
                            {errors.password && <p className="text-red-500 text-xs" aria-live="assertive">{errors.password}</p>}
                        </div>

                        <div className="mt-6">
                        <button 
                            role='button' 
                            type='submit' 
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50" 
                            disabled={loading}
                        >
                            {loading ? <BeatLoader loading={loading} color='#fff' size={8} /> : 'Sign Up'}
                        </button>

                        </div>

                    </form>

                    <p className="mt-6 text-sm text-center text-gray-400">Already have an account? <a href="/signin" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign in</a>.</p>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Register