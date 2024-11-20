import React from 'react';
import useConversation from '../zustand/useConversation';

const MessageBar = () => {
    const {selectedConversation}=useConversation();
    console.log(selectedConversation)
    return (
        <div className='h-full w-full '>
            <div className='flex items-center h-[100px] px-6 justify-start bg-[#000B58] gap-2'>
                <img className='w-[50px] rounded-[40px]' src={selectedConversation?.pic} alt="" />
                <h1 className='text-[16px] text-white font-semibold'>{selectedConversation?.name}</h1>
            </div>
        </div>
    );
};

export default MessageBar;