import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import Loader from './Loader';

const MessageBar = () => {
    const {selectedConversation, setMessages, messages}=useConversation();
    // console.log(selectedConversation)
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
         setLoading(true);
         const getMessages = async () => {
            setLoading(true);
            try {
                const get = await axios.get(`/api/msg/${selectedConversation?._id}`);
                const data = await get.data;
                if(data){
               
                   setLoading(false);
                setMessages(data);
                }
             
            } catch (error) {
                setLoading(false);
                console.log(error);

            }
        }
            if (selectedConversation?._id) getMessages();
    },[selectedConversation, setMessages])
    console.log(messages)
    return (
        <div className='h-full w-full '>
            <div className='flex items-center h-[100px] px-6 justify-start bg-[#B7B7B7] gap-2'>
                <img className='w-[50px] rounded-[40px]' src={selectedConversation?.pic} alt="" />
                <h1 className='text-[16px] text-white font-semibold'>{selectedConversation?.name}</h1>
            </div>

            <div className='flex-1 overflow-auto'>
                  {loading && <Loader></Loader>}
                  {!loading && messages?.length == 0 && ( <div>send a msg to chat</div>) }
                
            </div>
        </div>
    );
};

export default MessageBar;