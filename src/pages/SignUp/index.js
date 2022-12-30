import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Signup = () => {

  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (email, name, password) => {

    const res = register(email, name, password);
    console.log(res);
    
    if(res === '401'){
      console.log('401')
    }
    
  };

  return (
    <div className="container is-widescreen">
        <div className="notification is-info">
          <strong>Cadastre-se!</strong>
        </div>

        <input className="input" type="email" placeholder="Digite seu email" onChange={(e) => { setEmail(e.target.value) }}></input>
        <input className="input" type="text" placeholder="Digite seu nome" onChange={(e) => { setName(e.target.value) }}></input>
        <input className="input" type="password" placeholder="Digite sua senha" onChange={(e) => { setPassword(e.target.value) }}></input>

        <button className="button is-success" onClick={() => { handleSignup(email, name, password) }}>Entrar</button>
        <button className="button is-warning" onClick={() => { navigate('/signin')}}>Voltar</button>
      </div>
        
  );
}

export default Signup;
