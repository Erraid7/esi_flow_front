import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../translations/contexts/languageContext';
import { useDarkMode } from '../darkLightMode/darkModeContext';
import { Eye, EyeSlash } from 'iconsax-react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ForgotPasswordModal, VerificationModal, NewPasswordModal, SuccessModal } from "./forgot-password-modals"



const Login = () => {
  const { t } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const router = useRouter();
  
  const [formData, setFormData] = useState({ 
    identifier: '', // This will hold either email or phone
    password: '' 
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

   // States for forgot password flow
   const [resetEmail, setResetEmail] = useState("")
   const [currentModal, setCurrentModal] = useState(null)
  
  // Define your backend URL - you should use environment variables for this in production
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Clear error when user types
    if (error) setError('');
  };
  const BACKEND_URL = 'https://esiflow2.onrender.com';
  const handleSubmit = async (e) => {    
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Determine if the identifier is an email or phone based on its format
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier);
      
      // Prepare payload based on identifier type
      const payload = {
        password: formData.password
      };
      
      if (isEmail) {
        payload.email = formData.identifier;
      } else {
        // Treat as phone number
        payload.phone = formData.identifier.toString();
      }
      
      const response = await axios.post(`${BACKEND_URL}/auth/login`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      //push user info in the local storage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Redirection based on role
      if (response.data.role === 'Admin') {
        router.push('/dashboard/admin');
      } else if (response.data.role === 'Technician') {
        router.push('/dashboard/technician');
      } else {
        router.push('/dashboard/personal');
      }
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message || "Invalid credentials.");
        console.error("Login failed:", error.response.data.message);
      } else {
        console.error("Unexpected error:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Forgot password handlers
  const handleForgotPasswordClick = (e) => {
    e.preventDefault()
    setResetEmail(formData.email || "")
    setCurrentModal("forgot")
  }

  const handleContinue = (email) => {
    setCurrentModal("verification")
    setResetEmail(email)
  }

  const handleVerify = (email) => {
    setCurrentModal("newPassword")
    setResetEmail(email)
  }

  const handlePasswordReset = (newPassword) => {
    console.log("Password reset with:", newPassword)
    setCurrentModal("success")
  }

  const handleBackToLogin = () => {
    setCurrentModal(null)
  }

  const handleCloseModal = () => {
    setCurrentModal(null)
  }

  
  
  return (
    <div className='flex flex-col-reverse justify-between lg:flex-row h-screen bg-neutral-50 p-4 lg:p-0 dark:bg-neutral-990'>
      <div className='flex lg:hidden justify-center gap-3 items-center py-3 px-4'>
        <img
          src={isDarkMode ? "/logo-v-dark.svg" : "/logo-v.svg"}
          alt="Logo"
          className='w-20 h-12'
        />
        <img
          src={isDarkMode ? "/login/esi_white.svg" : "/login/esi_dark.svg"}
          alt="ESI Logo"
          className='w-20 h-12'
        />
      </div>
      
      {/* Left Side - Form Section */}
      <div className='flex flex-col gap-24 w-full lg:w-1/2 sm:px-12 lg:px-16 py-10'>
        <div className='hidden lg:flex justify-between items-center'>
          <img
            src={isDarkMode ? "/logo-v-dark.svg" : "/logo-v.svg"}
            alt="Logo"
            className=' w-20 h-12'
          />
          <img
            src={isDarkMode ? "/login/esi_white.svg" : "/login/esi_dark.svg"}
            alt="ESI Logo"
            className=' w-20 h-12'
          />
        </div>

        <div>
          <h1 className='text-3xl sm:text-4xl font-russo mb-6 text-neutral-950 dark:text-neutral-100'>
            {t('login', 'title')}
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='identifier' className='block mb-2 text-sm font-medium pl-4 text-neutral-950 dark:text-neutral-100'>
                {t('login', 'input1')}
              </label>
              <input
                id='identifier'
                name='identifier'
                type='text'
                placeholder={t('login', 'input1')}
                value={formData.identifier}
                onChange={handleChange}
                required
                className='w-full px-4 py-3 lg:py-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-300 placeholder-neutral-400 text-neutral-950 dark:text-neutral-100'
              />
            </div>

            <div>
              <label htmlFor='password' className='block mb-2 text-sm font-medium pl-4 text-neutral-950 dark:text-neutral-100'>
                {t('login', 'ph2')}
              </label>
              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('login', 'input2')}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 lg:py-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-300 placeholder-neutral-400 text-neutral-950 dark:text-neutral-100'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-4 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size='20' variant="Bold" color={isDarkMode ? '#F8F9FA' : '#5E636F'} /> : <EyeSlash size='20' variant="Bold" color={isDarkMode ? '#F8F9FA' : '#5E636F'} />}
                </button>
              </div>
            </div>

            <div className='flex justify-between items-center'>
              <label className='flex items-center text-neutral-950 dark:text-neutral-100'>
                <input type='checkbox' className='mr-2' />
                {t('login', 'remember')}
              </label>
              <a
                  href="#"
                  onClick={handleForgotPasswordClick}
                  className="text-primary-600 dark:text-primary-300 hover:underline"
                >
                  {t("login", "forgot")}
                </a>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-primary-600 hover:bg-primary-700 hover:dark:bg-primary-400 dark:bg-primary-300 dark:text-neutral-950 text-neutral-100 p-3 rounded-lg transition duration-300 font-bold'>
              {loading ? 'Loading...' : t('login', 'button')}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Glassmorphism Section */}
      <div className='flex h-[200px] lg:h-screen bg-cover bg-center w-full lg:w-1/2 bg-[url("/login/glassmorphism.svg")] justify-center items-center rounded-md lg:rounded-none'>
        <div className='w-[200px] lg:w-[526px] h-[115px] lg:h-[302px] backdrop-blur-sm bg-white/15 rounded-3xl flex justify-center items-center'>
          <img src="/logo-v-dark.svg" alt="ESI Flow" className='hidden lg:block' />
          <img src="/logo-v-dark.svg" alt="ESI Flow" className='w-24 h-16 block lg:hidden' />
        </div>
      </div>
       {/* Forgot Password Modals - Only show one modal at a time based on currentModal state */}
       {currentModal === "forgot" && (
        <ForgotPasswordModal
          email={resetEmail}
          setEmail={setResetEmail}
          onClose={handleCloseModal}
          onContinue={handleContinue}
        />
      )}

      {currentModal === "verification" && (
        <VerificationModal 
          email={resetEmail}
          onClose={handleCloseModal} 
          onVerify={handleVerify} 
        />
      )}

      {currentModal === "newPassword" && (
        <NewPasswordModal 
          email={resetEmail}
          onClose={handleCloseModal} 
          onSubmit={handlePasswordReset} 
        />
      )}

      {currentModal === "success" && (
        <SuccessModal onClose={handleBackToLogin} />
      )}
    </div>
  );
};

export default Login;