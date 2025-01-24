import React, { createContext, useState } from 'react'

const AuthContext = createContext({});

export const AuthProviderr = ({children}) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;