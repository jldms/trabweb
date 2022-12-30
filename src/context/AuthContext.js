import { createContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { api, apiAuthenticated } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(() => {
    const acess = localStorage.getItem('@trabweb:access')
    
    if (acess) {
      return true;
    }
    else {
      return false;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    
  }, [isLogged]);

  const about = async () => {

    try {
      await apiAuthenticated
        .get('/auth/me')
        .then((response) => {
          console.log(response);
        });
    }
    catch (error) {
      console.log(error.response.status);
    }
  }

  const login = async (email, password) => {

    try {
      await api
        .post('/auth/signin', {
          email: email,
          password: password,
        })
        .then((response) => {
          setIsLogged(true)
          localStorage.setItem('@trabweb:access', response.data.user.token)
          navigate('/')

        });
    }
    catch (error) {
      console.log(error.response.status);
    }

  }

  const logout = () => {
    localStorage.removeItem('@trabweb:access')
    navigate('/signin')
  }

  const register = async (email, name, password) => {

    try {
      await api
        .post('/auth/signup', {
          email: email,
          name: name,
          password: password,
        })
        .then((response) => {
          console.log(response);
        });
    }
    catch (error) {
      console.log(error.response.status);
    }

  }

  const delReview = async (id) => {
    try {
        await apiAuthenticated
            .delete(`/favorites/${id}`)
                .then((response) => {
                    console.log(response)
                });
    }
    catch (error) {
        console.log(error.response.status);
    }
}

  return (
    <AuthContext.Provider value={{ isLogged, login, register, about, logout, setIsLogged, delReview }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;