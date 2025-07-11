import React, { useState } from 'react'
// import logo from "../../../../assets/smart-app-icon.svg"
import { Car, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { authDataContext } from '../../../../context/Isauthcontext';
import { userdatacontext } from '../../../../context/Userprottected';
import { useContext } from 'react';

const Login = () => {

  const navigate = useNavigate();
  const [showpassword, setShowpassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Add loading state

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  

  const { serverUrl } = useContext(authDataContext);
  const { getcurruser } = useContext(userdatacontext);

  const submithandler = async(e) => {
    e.preventDefault()
    setIsLoading(true) // Set loading state
    
    // Debug: Log the data being sent
    console.log("Sending data:", {
       email, password
    });
    

    try {
      const result = await axios.post(serverUrl + "/api/driver/login", {
        email, 
        password, 
       
      }, { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log("Success:", result.data)
      getcurruser()
      navigate("/dashboard");

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false) // Reset loading state
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white flex flex-col'>

      {/* Header */}
      <div
        onClick={() => navigate("/")}
        className='w-full h-20 flex items-center justify-start px-6 lg:px-8 cursor-pointer hover:bg-white/5 transition-colors'
      >
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
            <Zap className='w-6 h-6' />
          </div>
          <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
            SmartCharge
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex items-center justify-center px-4 py-8'>
        <div className='w-full max-w-md'>

          {/* Title Section */}
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold mb-2'>Create Account</h2>
            <p className='text-slate-400'>Make your Life Easier</p>
          </div>

          {/* Form Container */}
          <div className='bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8'>
            <form onSubmit={submithandler} className='space-y-6'>

              {/* Personal Information */}
              <div className='space-y-4'>
                

                <div className='relative'>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder='Email Address'
                    required
                    type="email"
                    className='w-full h-12 px-4 bg-white/5 border-2 border-white/20 rounded-lg 
                             placeholder-white/60 text-white font-medium
                             focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20
                             transition-all duration-200'
                  />
                </div>

                <div className='relative'>
                  <input onChange={(e) => setPassword(e.target.value)} required value={password} placeholder='Password' type={showpassword ? "text" : "password"} className='w-full h-12 px-4 pr-12 bg-white/5 border-2 border-white/20 rounded-lg 
                             placeholder-white/60 text-white font-medium
                             focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20
                             transition-all duration-200' />
                  {!showpassword && <IoEyeOutline onClick={() => setShowpassword(true)} className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer' />}
                  {showpassword && <IoEyeOffOutline onClick={() => setShowpassword(false)} className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer' />}

                </div>

                
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className='w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg 
                         font-semibold text-white shadow-lg
                         hover:from-blue-600 hover:to-purple-700 
                         focus:outline-none focus:ring-2 focus:ring-blue-400/50
                         transform hover:scale-[1.02] transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
              

              {/* Login Link */}
              <div className='text-center pt-4'>
                <p className='text-white/80'>
                  Create New Account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className='text-blue-400 font-semibold hover:text-blue-300 transition-colors'
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login