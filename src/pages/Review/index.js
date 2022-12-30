import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';

import { apiAuthenticated } from '../../services/api';

const Review = () => {

  const {  logout} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getMyReview = async () => {

        try {
          await apiAuthenticated
            .get('/reviews/my')
            .then((response) => {
              console.log(response);
            });
        }
        catch (error) {
          console.log(error.response.status);
        }
      };
      getMyReview();
  }, []);
  
  return (
    <>
      <p>reviews</p>

      <button onClick={() => { logout()} } >
        logout
      </button>

      <button onClick={() => { navigate('/')} } >
        voltar
      </button>
    </>
  );
}

export default Review;