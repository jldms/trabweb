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
            <div className="container is-widescreen">

                <nav class="navbar is-dark" role="navigation" aria-label="main navigation">

                    <div id="navbarBasicExample" class="navbar-menu">
                        <div class="navbar-start">
                            <a class="navbar-item" onClick={() => { navigate('/') }}>
                                Voltar
                            </a>

                        </div>

                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div class="buttons">
                                    <a class="button is-primary" onClick={() => { logout() }}>
                                        <strong>Sair</strong>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <h1 class="subtitle is-1">Aqui estão suas avaliações: </h1>

                {review.length > 0 ?
                    review.map((review) => {
                        return (
                            <div key={review.imdbID}>
                                {review.imdbID}
                                {review.comment}
                                <button onClick={() => { delReview(review.imdbID) }} >
                                    Excluir comentário
                                </button>
                            </div>
                        )
                    })
                    :
                    <p>Você não possui reviews</p>
                }
            </div>
        </>
    );
}

export default Review;