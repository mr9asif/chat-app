import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../ContextApi/Context';
import SideBar from './SideBar/SideBar';

const Home = () => {
    const {user} = useContext(AuthContext);
    
    const handleSearch = e =>{
        e.preventDefault();
        const search = e.target.search.value;
        console.log(search)

        axios.get(`/api/user/search/?search=${search}`)
        .then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }
     
    return (
        <div className='max-w-8xl  h-full   mx-auto ' >
        <div className='bg-gray-300 w-[30%] p-5 flex items-center gap-4'>
        <form onSubmit={handleSearch} action="">
        <input name='search' className='text-xl border p-2  outline-none px-3 rounded' type="text" placeholder='Search user' />
        <input  type="submit" value="Search" className='border rounded bg-orange-400 hover:bg-orange-600 p-2  cursor-pointer text-xl font-medium' />
      </form>
      <div className=' '>
         <img className='w-[60px] rounded-[50%]' src={user.pic} alt="" />
      </div>
        </div>
           <SideBar></SideBar>
        </div>
    );
};

export default Home;