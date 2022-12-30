import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignin = (user, password) => {
    const res = login(user, password);

    if(res === '401'){
      console.log('401')
    }
    
  };

  return (
    <>
      
        

      <div className="container is-widescreen">
        <div className="notification is-info">
          <strong>Seja bem vindo!</strong>
        </div>

        <input className="input" type="email" placeholder="Digite seu email" onChange={(e) => { setEmail(e.target.value) }}></input>
        <input className="input" type="password" placeholder="Digite sua senha" onChange={(e) => { setPassword(e.target.value) }}></input>

        <button className="button is-success" onClick={() => { handleSignin(email, password) }}>Entrar</button>
        <button className="button is-warning" onClick={() => { navigate('/signup')}}>Cadastre-se</button>
      </div>
    </>
  );
}

export default SignIn;