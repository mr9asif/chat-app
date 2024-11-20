import axios from 'axios'; // Make sure to import axios
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";

const Login = () => {
      const navigate = useNavigate();
      const [pass, setPass]=useState(true);
      const [loading, setLoading]=useState(true);

      const handleEye = ()=>{
        setPass(!pass)
      }

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const user = { email, password };

    try {
      const res = await axios.post('/api/user/login', user,  { withCredentials: true } );
      console.log('Login successful', res.data);
     
        const user2 =JSON.stringify(res.data);
       localStorage.setItem("user",user2);
       toast.success('Successfully Login!');
       setLoading(false)
        navigate('/')
      // Handle successful login (e.g., redirect, save token, etc.)
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response) {
        // Handle specific error responses
        setLoading(false)
        if (error.response.status === 401) {
          toast.error('Incorrect email or password!')
          console.log("invalid")
        }if(error.response.status === 400){
          toast.error('Incorrect Password!')
        } 
        if(error.response.status === 404){
          toast.error("User does not exist!")
        }
      } 
    }
  };

 

  return (
    <div className='w-full h-screen  flex justify-center items-center register'>
      <div>
        <img
          src="https://i.postimg.cc/XqRQQfDs/3d-man-holding-mobile-sign-in-with-security-key-illustration-png.png"
          alt=""
        />
      </div>

      <div className=' w-[35%] px-6 rounded-sm p-4 shadow-md bg-[#00233A]'>
        <h1 className='text-center text-3xl text-white font-bold'>Login</h1>
        <form onSubmit={handleLogin}>
          <label>
            <h2 className='text-xl font-semibold text-white py-2'>Email</h2>
            <input
              className='text-sm w-full bg-white font-semibold outline-none p-2'
              type="email"
              name='email'
              required // Consider adding required attribute for better UX
            />
          </label>
          <label>
            <h2 className='text-xl text-white font-semibold py-2'>Password</h2>
           <div className='flex items-center border bg-white px-2'>
           <input
           className='text-sm w-full font-semibold outline-none p-2'
           type={pass ? "password" : "text"}
           name='password'
           required // Consider adding required attribute for better UX
         /><div onClick={handleEye} className='cursor-pointer'>{pass ?<FaEyeSlash /> : <FaEye />}</div>
           </div>
          </label>
          <input
            className='block w-full p-2 hover:bg-blue-700 mt-2 cursor-pointer text-xl font-semibold bg-blue-500 text-white'
            type="submit"
            value='Login'
          />
        </form>
        <p className='text-xl text-white font-semibold my-3'>
          Don't have an account? <Link to='/register' className='font-bold text-xl underline'>Register</Link>
        </p>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default Login;