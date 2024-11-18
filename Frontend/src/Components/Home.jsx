import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../ContextApi/Context';
import SideBar from './SideBar/SideBar';

const Home = () => {
    const {user} = useContext(AuthContext);
    const [searchUsers, setSearchUsers] = useState([]);
    const [isSearch, setIsSearch]= useState();
   
    
    const handleSearch = e =>{
        e.preventDefault();
        const search = e.target.search.value;
      


        axios.get(`/api/user/search/?search=${search}`)
        .then(res=>{
            console.log(res)
            
            setSearchUsers(res.data)
            setIsSearch(true);
            e.target.reset()
            
        }).catch(err=>{
            console.log(err)
            if(err.status === 400) {toast.error("please provide a value to search")
                setIsSearch('')}
        })
    }
     
    return (
        <div className='max-w-8xl  h-full   mx-auto ' >
        <div className='bg-[#00233A] w-[30%] p-5 flex items-center gap-4'>
        <form onSubmit={handleSearch} action="">
        <input name='search' className='text-xl border p-2  outline-none px-3 rounded' type="text" placeholder='Search user' />
        <input  type="submit" value="Search" className='border rounded bg-orange-400 hover:bg-orange-600 p-2  cursor-pointer text-xl font-medium' />
      </form>
      <div className=' '>
         <img className='w-[60px] rounded-[50%]' src={user.pic} alt="" />
      </div>
        </div>
           <SideBar  searchUsers ={searchUsers} isSearch={isSearch} setIsSearch={setIsSearch}></SideBar>
           <Toaster></Toaster>
        </div>
    );
};

export default Home;