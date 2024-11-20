import React from "react";
import useConversation from "../../zustand/useConversation";

const User = ({ user }) => {
    const { name, pic, _id } = user;
    const { selectedConversation, setSelectedConversation } = useConversation();
    

    const handleSelectUser = (user) => {
      
        setSelectedConversation(user);
    };

    const isSelected = selectedConversation?._id === _id;

    return (
        <div
            onClick={() => handleSelectUser(user)}
            className={`cursor-pointer w-full p-2 flex items-center gap-3 mb-2 ${
                isSelected ? "bg-blue-500" : "bg-gray-100"
            }`}
        >
            <img className="w-[40px] h-[40px] rounded-full" src={pic} alt={`${name}'s avatar`} />
            <h1 className="text-2xl font-bold">{name}</h1>
        </div>
    );
};

export default User;
