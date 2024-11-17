import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../ContextApi/Context';
import User from './User';

const SideBar = () => {
      const {user} =useContext(AuthContext);
     const [chatUsers, setChatUsers]=useState([]);

   

      useEffect(()=>{
           const chatUsers = async ()=>{
            try {
                axios.get('/api/user/currentchattes')
                .then(res=>{
                 console.log(res.data)
                 setChatUsers(res.data);
                }).catch(err=>{
                 console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
           }
           chatUsers()
      },[])


    return (
        <div className=' bg-gray-300 w-[30%] h-screen p-5'>
           
          
            
             <div>
                {
                    chatUsers.map(user=> <User key={user.key} user={user}></User>)
                }
             </div>
          
        </div>
    );
};

export default SideBar;