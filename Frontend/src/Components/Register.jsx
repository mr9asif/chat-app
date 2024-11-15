import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, Navigate } from 'react-router-dom';
import "../App.css";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [pass, setPass]=useState(true);
  const [pic, setPic]= useState();

  const postDetails = (pic)=>{
     
  }

  const handleEye = ()=>{
    setPass(!pass)
  }
  
  const onSubmit = async(data) => {
    try {
      const res = await axios.post("http://localhost:5000/register", data);
      console.log("Registration successful", res.data);
      toast.success('Successfully Register!')
      Navigate('/login')
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          toast.error("User already exists!");
          console.log("User already exists");
        } else {
          alert('An error occurred while registering. Please try again.');
          console.error('Error registering user:', error.response.data);
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        alert('Network error or server not responding.');
        console.error('Error registering user:', error.message);
      }
    }
  };
  

  return (
    <div className='w-full h-screen register  flex justify-center items-center'>
      <div>
        <img src="https://i.postimg.cc/MHL3Q2Sf/man-holding-sign-up-form-3d-illustration-download-in-png-blend-fbx-gltf-file-formats-signin-login-u.png" alt="Register Illustration" />
      </div>
      <div className=' w-[35%] px-6 rounded-sm p-4 shadow-md bg-[#013650]'>
        <h1 className='text-center text-3xl text-white font-bold'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <h2 className='text-xl text-start text-white font-bold py-2'>Name</h2>
            <input
              className='text-sm w-full font-semibold outline-none p-2'
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" }
              })}
            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
          </label>

          <label>
            <h2 className='text-xl text-start text-white font-semibold py-2'>Email</h2>
            <input
              className='text-sm w-full font-semibold outline-none p-2'
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email address" }
              })}
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </label>

          <label>
            <h2 className='text-xl text-start text-white font-semibold py-2'>Password</h2>
           <div className='flex items-center border bg-white px-2'>
           <input
           className='text-sm w-full text-black bg-none font-semibold outline-none p-2'
           type={pass ? "password" : "text"}
           {...register("password", {
             required: "Password is required",
             minLength: { value: 6, message: "Password must be at least 6 characters" }
           })}
         /> <div onClick={handleEye} className='cursor-pointer'>{pass ?<FaEyeSlash /> : <FaEye />}</div>
           </div>
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </label>
          <label htmlFor="">
               <h1 className='text-xl text-start text-white font-semibold py-2'>Upload your picture</h1>
               <input className='text-sm w-full text-white font-semibold outline-none p-2 ' type="file" accept='image/*' onChange={e=>postDetails(e.target.files[0])} />
               
          
          </label>

          <input
            className='block w-full p-2 hover:bg-orange-700 mt-2 cursor-pointer text-xl font-semibold bg-orange-500 text-white'
            type="submit"
            value="Register"
          />
        </form>
        <p className='text-xl text-white font-semibold my-3'>
          Already have an account? <Link to='/login' className='font-bold underline text-xl'>Login</Link>
        </p>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default Register;