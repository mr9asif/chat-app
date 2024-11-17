import React from 'react';

const User = ({user}) => {
    const {name, pic}=user;
    return (
        <div className='bg-orange-300 w-full p-2 flex items-center gap-3'>
            <img className='w-[40px] rounded-[50%]' src={pic} alt="" />
            <h1 className='text-2xl font-bold '>{name}</h1>
        </div>
    );
};

export default User;