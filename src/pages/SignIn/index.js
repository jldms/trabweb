import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';


const SignIn = () => {

  const { register, login, about, logout} = useContext(AuthContext);

  
  return (
    <>
      <button onClick={() => { register('joao@gmail', 'joao', '123')} } >
        register
      </button>

      <button onClick={() => { login('joao@gmail', '123')} } >
        login
      </button>

      <button onClick={() => { about()} } >
        about
      </button>

      <button onClick={() => { logout()} } >
        logout
      </button>
    </>
  );
}

export default SignIn;