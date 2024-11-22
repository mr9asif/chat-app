import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsSendFill } from "react-icons/bs";
import notify from "../assets/notify.mp3";
import { AuthContext } from '../ContextApi/Context';
import { useSocketContext } from '../ContextApi/SocketContext';
import useConversation from '../zustand/useConversation';

const MessageBar = () => {
    const {selectedConversation, setMessages, messages}=useConversation();
    // console.log(selectedConversation)
    const [loading, setLoading] = useState(false);
    const lastMessageRef = useRef();
    const {user}=useContext(AuthContext);
    const [sending , setSending] = useState(false);
    const [sendData , setSnedData] = useState("");
    // const {socket, onlineUser } = useContext(SocketContext)
    const {socket,onlineUser} = useSocketContext();
   

    useEffect(()=>{
      socket?.on("newMessage",(newMessage)=>{
        const sound = new Audio(notify);
        sound.volume=0.1;
        sound.play();
        // Stop after 2000 milliseconds (2 seconds)
        setMessages([...messages,newMessage])
      })

      return ()=> socket?.off("newMessage");
    },[socket,setMessages,messages])

    useEffect(()=>{
       setTimeout(()=>{
            lastMessageRef?.current?.scrollIntoView({behavior:"smooth"})
       },1000)
    },[messages])

    console.log(selectedConversation)

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
                }if(!data){
                setLoading(false)
                   data.length === 0
                }
             
            } catch (error) {
                setLoading(false);
                console.log(error);

            }
        }
            if (selectedConversation?._id) getMessages();
    },[selectedConversation, setMessages])

    const handelMessages=(e)=>{
        setSnedData(e.target.value)
      }
   
      const handelSubmit=async(e)=>{
        e.preventDefault();
        setSending(true);
        try {
            const res =await axios.post(`/api/msg/send/${selectedConversation?._id}`,{messages:sendData});
            const data = await res.data;
            if (data.success === false) {
                setSending(false);
                console.log(data.message);
            }

       
            setSending(false);
            setSnedData('')
            setMessages([...messages,data])
        } catch (error) {
            setSending(false);
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col   h-screen w-full '>
            <div className='flex items-center h-[100px] px-6 justify-start bg-gray-300 gap-2'>
                <img className='w-[50px] h-[50px] rounded-[40px]' src={selectedConversation?.pic} alt="" />
                <h1 className='text-[16px] text-white font-semibold'>{selectedConversation?.name}</h1>
            </div>

            <div className='flex-1 h-full overflow-auto register'>
                  {loading && <h1>Loading...</h1>}
                  {!loading && messages?.length == 0 && ( <div>send a msg to chat</div>) }
                    
                   {!loading && messages?.length > 0 && messages?.map((message) => (
                <div className='text-white' key={message?._id} ref={lastMessageRef}>
                  <div className={`chat ${message.senderId === user?._id ? 'flex justify-end' : 'flex justify-start'}`}>
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
              <form onSubmit={handelSubmit} className='rounded-full text-black'>
            <div className='w-full mx-auto border rounded-full flex items-center bg-gray-400'>
              <input value={sendData} onChange={handelMessages} required id='message' type='text' 
              className='w-full bg-transparent outline-none px-4 rounded-full'/>
              <button type='submit'>
                {sending ? <div className='loading loading-spinner'></div>:
                <BsSendFill size={25}
                className='text-sky-700 cursor-pointer rounded-full bg-gray-800 w-10 h-auto p-1'/>
                }
              </button>
            </div>
            </form>
            
        </div>
    );
};

export default MessageBar;