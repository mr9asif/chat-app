// import jwtDecode from 'jwt-decode'; // For decoding JWT

import React, { createContext } from 'react';

const AuthContext = createContext();
const Context = ({children}) => {
      
      const parse = localStorage.getItem("user");
      const user = JSON.parse(parse)

       const info ={
       user
       }
    
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default Context;
export { AuthContext };

