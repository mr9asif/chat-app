import React, { useEffect, useState } from "react";
import { useSocketContext } from "../../ContextApi/SocketContext";
import useConversation from "../../zustand/useConversation";

const User = ({ user, chatUsers }) => {
    const { name, pic, _id } = user;
   
    const { selectedConversation, setSelectedConversation , messages, setMessages} = useConversation();
    const { socket, onlineUser } = useSocketContext();
    const [online, setOnline] = useState(false);

 



  
    


   


    useEffect(() => {
        // Check if the current user's _id is in the onlineUser list
        setOnline(onlineUser.includes(_id));
    }, [onlineUser, _id]); // Re-run whenever onlineUser or _id changes

    const handleSelectUser = (user) => {
        setSelectedConversation(user);
    };

    const isSelected = selectedConversation?._id === _id;

    return (
        <div
            onClick={() => handleSelectUser(user)}
            className={`cursor-pointer w-full p-2 flex items-center gap-3 mb-2 relative ${
                isSelected ? "bg-blue-500" : "bg-gray-100"
            }`}
        >
            <div className="flex items-center relative">
                <img
                    className="w-[40px] h-[40px] rounded-full"
                    src={pic}
                    alt={`${name}'s avatar`}
                />
                {/* Display green indicator if user is online */}
                {online && (
                    <div className="bg-green-500 w-3 h-3 rounded-full absolute top-0 right-0"></div>
                )}
            </div>
            <h1 className="text-2xl font-bold">{name}</h1>
            
        </div>
    );
};

export default User;
