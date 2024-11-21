import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../ContextApi/Context';

import useConversation from '../zustand/useConversation';
import MessageBar from './MessageBar';
import SideBar from './SideBar/SideBar';

const Home = () => {
   
    const {user} = useContext(AuthContext);
    const [searchUsers, setSearchUsers] = useState([]);
    const [isSearch, setIsSearch]= useState();
    const {setSelectedConversation, selectedConversation}=useConversation();
    
  
    
    const handleSearch = e =>{
        e.preventDefault();
        const search = e.target.search.value;
      


        axios.get(`/api/user/search/?search=${search}`)
        .then(res=>{
            
            
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
        <div className={` flex flex-start ${selectedConversation === null && "flex item-center justify-center"} justify-center max-w-8xl   h-100vh bg-gray-100  mx-auto `} >
        <div className=' w-[30%] h-screen flex-col bg-gray-300  flex items-center gap-4'>
        <div className='flex items-center w-full gap-4 p-5 bg-[#00233A]'>
        <form onSubmit={handleSearch} className=' ' action="">
        <input name='search' className='text-xl  p-2  outline-none px-3 ' type="text" placeholder='Search user' />
        <input  type="submit" value="Search" className=' bg-orange-400 hover:bg-orange-600 p-2  cursor-pointer text-xl font-medium' />
      </form>
      <div className=' '>
         <img className='w-[60px] rounded-[50%]' src={user?.pic} alt="" />
      </div> 
        </div>
       <SideBar className="w-full " searchUsers ={searchUsers} isSearch={isSearch} setIsSearch={setIsSearch}></SideBar>
        </div>
          <div className="w-[70%] h-full ">
               {selectedConversation == null ? <>
                      <div className='flex flex-col h-[200px]    items-center justify-center'>
                          <h1 className="text-3xl font-bold text-[#133E87] text-center">Welcome to Chat🥰 {user?.name}</h1>
                          <h1 className='text-2xl font-semibold text-center text-gray-700'>Select or Search Someone to Chat 🔎</h1>
                          <img className="w-[60px] mt-2  " src="https://i.postimg.cc/fRGw12Xk/e57821f1317893d1c2d8e184d4f9d595-chat-bubble-icon.png" alt="" />
                      </div>
               </> : <><MessageBar></MessageBar> </>}
          </div>
           <Toaster></Toaster>
        </div>
    );
};

export default Home;