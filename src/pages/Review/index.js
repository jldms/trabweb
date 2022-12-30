import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';

import { apiAuthenticated } from '../../services/api';

const Review = () => {

    const { logout, delReview } = useContext(AuthContext);

    const [review, setReview] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const getMyReview = async () => {

            try {
                await apiAuthenticated
                    .get('/reviews/my')
                    .then((response) => {
                        console.log(response);
                        setReview(response.data.reviews)
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
            <p>Tela de reviews</p>

            <button onClick={() => { logout() }} >
                logout
            </button>

            <button onClick={() => { navigate('/') }} >
                voltar
            </button>

            {review.length > 0 ?
                review.map((review) => {
                    return (
                        <div key={review.imdbID}>
                            {review.imdbID}
                            <button onClick={() => { delReview(review.imdbID) }} >
                                remover dos favoritos
                            </button>
                        </div>
                    )
                })
                :
                <p>você não possui reviews</p>
            }
        </>
    );
}

export default Review;