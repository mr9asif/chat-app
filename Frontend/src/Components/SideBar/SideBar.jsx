import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { IoArrowBackCircle } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/Context';
import SUser from './SUser';
import User from './User';

const SideBar = ({ searchUsers, isSearch, setIsSearch,  }) => {
    const { user } = useContext(AuthContext);
    
    const [chatUsers, setChatUsers] = useState([]);
    const navigate = useNavigate();

    const handleLogout= ()=>{
        axios.post('/api/logout')
        .then(res=>{
            console.log(res.data)
            localStorage.removeItem('user');
            navigate('/login')
            
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(() => {
        const fetchChatUsers = async () => {
            try {
                const res = await axios.get('/api/user/currentchattes');
                setChatUsers(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchChatUsers();
    }, []);

    const handleBack = ()=>{
        setIsSearch(false);
       
    }

    return (
        <div className=" w-full px-2 h-full  ">
            {isSearch ? (
                <div>
                    {searchUsers.length > 0 ? (
                        <div className='min-h-[70vh]'>
                       { searchUsers.map(user => <SUser key={user._id} user={user} />)}
                        </div>
                    ) : (
                        <div className='flex flex-col min-h-[70vh] items-center px-2 mt-7'>
                            <h1 className="text-xl font-bold  rounded-md py-2 px-4 text-center text-black mt-5">User not found 😒</h1>
                        </div>
                    )}
                    <div className='b-0 h-[20%]'>
                    <IoArrowBackCircle onClick={handleBack}  className='text-4xl text-center cursor-pointer text-orange-500 ' />
                    </div>
                </div>
            ) : (
                <div className=' '>
                    <div className='min-h-[70vh] '>
                    {chatUsers.map(user => <User key={user._id} user={user} />)}
                    </div>
                    
                    <div className='h-[20%]'>
                    <button onClick={handleLogout} className='border flex items-center gap-1 rounded-md p-2 bg-orange-500 hover:bg-orange-700 cursor-pointer text-white text-[12px] font-medium'> <LuLogOut className='text-xl font-medium' /> Log out </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SideBar;
