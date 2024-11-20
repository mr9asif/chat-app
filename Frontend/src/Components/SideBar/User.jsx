import React, { useState } from 'react';



const User = ({ user }) => {
    const { name, pic, _id } = user;
    const [selectUser, setSelectUser] = useState(null);
   

    const handlSelecteUser = (userId) => {
        console.log("User clicked:", userId);
        setSelectUser(userId._id);
    };

    console.log("Selected User:", selectUser); // Debugging line
   

    return (
        <div
            onClick={() => handlSelecteUser(user)}
            className={`bg-gray-100 ${
                selectUser === user?._id ? "bg-orange-400" : ""
            } cursor-pointer w-full p-2 flex items-center gap-3 mb-2`}
        >
            <img className="w-[40px] rounded-[50%]" src={pic} alt="" />
            <h1 className="text-2xl font-bold">{name}</h1>
        </div>
    );
};

export default User;
