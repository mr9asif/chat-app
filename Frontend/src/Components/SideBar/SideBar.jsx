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
        <div className="bg-gray-300 w-[30%] min-h-[70%] max-h-[80%] m overflow-y-auto scrollbar p-5">
            {isSearch ? (
                <div>
                    {searchUsers.length > 0 ? (
                        searchUsers.map(user => <SUser key={user._id} user={user} />)
                    ) : (
                        <div className='flex flex-col items-center px-2 mt-7'>
                            <h1 className="text-xl font-bold  rounded-md py-2 px-4 text-center text-black mt-5">User not found 😒</h1>
                        </div>
                    )}
                    <div className='b-0'>
                    <IoArrowBackCircle onClick={handleBack}  className='text-4xl text-center cursor-pointer text-orange-500 ' />
                    </div>
                </div>
            ) : (
                <div>
                    {chatUsers.map(user => <User key={user._id} user={user} />)}
                    <button onClick={handleLogout} className='border flex items-center gap-1 rounded-md p-2 bg-orange-500 hover:bg-orange-700 cursor-pointer text-white text-[12px] font-medium'> <LuLogOut className='text-xl font-medium' /> Log out </button>
                </div>
            )}
        </div>
    );
};

export default SideBar;
