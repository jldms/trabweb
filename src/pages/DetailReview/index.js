import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';

import { apiAuthenticated } from '../../services/api';

const DetailReview = () => {

    const { logout } = useContext(AuthContext);

    const [detail, setDetail] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const getMyReview = async () => {

            try {
                await apiAuthenticated
                    .get('/reviews/tt0372784')
                    .then((response) => {
                        console.log(response);
                        setDetail(response.data.reviews)
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
            <p>Review</p>

            <button onClick={() => { logout() }} >
                logout
            </button>

            <button onClick={() => { navigate('/') }} >
                voltar
            </button>

            {detail.length> 0 ?
                detail.map((detail, index) => {
                    return(
                        <div class="card" key={index}>
                            {detail.comment}
                        </div>
                    )
                })
                :
                <p> não há reviews para este filme</p>
            }
            
        </>
    );
}

export default DetailReview;