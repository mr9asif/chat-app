import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../ContextApi/Context';
import useConversation from '../zustand/useConversation';
import Loader from './Loader';

const MessageBar = () => {
    const {selectedConversation, setMessages, messages}=useConversation();
    // console.log(selectedConversation)
    const [loading, setLoading] = useState(false);
    const lastMessageRef = useRef();
    const {user}=useContext(AuthContext);

    useEffect(()=>{
       setTimeout(()=>{
            lastMessageRef?.current?.scrollIntoView({behavior:"smooth"})
       },1000)
    },[messages])

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
        <div className='flex flex-col   h-screen w-full '>
            <div className='flex items-center h-[100px] px-6 justify-start bg-gray-300 gap-2'>
                <img className='w-[50px] rounded-[40px]' src={selectedConversation?.pic} alt="" />
                <h1 className='text-[16px] text-white font-semibold'>{selectedConversation?.name}</h1>
            </div>

            <div className='flex-1 h-full overflow-auto bg-gray-500'>
                  {loading && <Loader></Loader>}
                  {!loading && messages?.length == 0 && ( <div>send a msg to chat</div>) }
                    
                   {!loading && messages?.length > 0 && messages?.map((message) => (
                <div className='text-white' key={message?._id} ref={lastMessageRef}>
                  <div className={`chat ${message.senderId === user._id ? 'flex justify-end' : 'flex justify-start'}`}>
                    <div className='flex flex-col'></div>
                    <div className={`chat-bubble p-2 `}>
                      <p className={`p-2 rounded-md ${message.senderId === user._id ? 'bg-sky-600' : 'bg-gray-400'

                    }`}>{message?.message}</p>
                       <div className=" text-[13px] flex items-center  gap-2 font-semibold  opacity-80">
                      <h1>{new Date(message?.createdAt).toLocaleDateString('en-IN')}</h1>
                      <p> {new Date(message?.createdAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute:
                         'numeric' })}</p>
                    </div>
                    </div>
                   
                  </div>
                </div>
              ))}
            </div>
        </div>
    );
};

export default MessageBar;