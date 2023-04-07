import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';

import api from '../utils/Api';
import * as auth from '../utils/auth';

import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [cardToDelete, setCardToDelete] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([api.getUserInfoApi(), api.getInitialCards()])
            .then(([user, cardData]) => {
                setCurrentUser(user);
                setCards(cardData)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function closePopup(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            closeAllPopups();
        }
        else if (evt.target.classList.contains('popup__close-button')) {
            closeAllPopups();
        }
        else if (evt.key === 'Escape') {
            closeAllPopups();
        }
    };

    const handleLogin = useCallback(
        (email, password) => {
            auth
                .authorize(email, password)
                .then((data) => {
                    if (data.token) {
                        localStorage.setItem('jwt', data.token);
                        setLoggedIn(true);
                        setEmail(email);
                        navigate('/sign-in', { replace: true });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [navigate]
    );

    const handleRegister = useCallback(
        (email, password) => {
            auth
                .register(email, password)
                .then((res) => {
                    handleSuccessfulRegistration();
                    localStorage.setItem('jwt', res.jwt);
                    setLoggedIn(true);
                    setEmail(email);
                    navigate('/', { replace: true });
                    return res;
                })
                .catch((err) => {
                    handleFailedRegistration();
                    console.log(err);
                })
                .finally(() => {
                    handleInfoTooltipClick();
                });
        },
        [navigate]
    );

    const checkToken = useCallback(() => {
        const token = localStorage.getItem('jwt');
        auth
            .getContent(token)
            .then((res) => {
                if (res) {
                    setLoggedIn(true);
                    setEmail(res.data.email);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        checkToken();
    }, [checkToken]);

    const handleSignOut = useCallback(() => {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
    }, []);

    function handleSuccessfulRegistration() {
        setSuccess(true);
    }

    function handleFailedRegistration() {
        setSuccess(false);
    }

    function handleInfoTooltipClick() {
        setIsInfoTooltipOpen(true);
    }

    useEffect(() => {
        if (isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || selectedCard || isDeletePopupOpen) {
            document.addEventListener('keydown', closePopup);
            document.addEventListener('mousedown', closePopup);
        }
        return () => {
            document.removeEventListener('keydown', closePopup);
            document.removeEventListener('mousedown', closePopup);
        };
    });

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeletePopupOpen(false);
        setSelectedCard(null);
        setIsInfoTooltipOpen(false);
    }


    function handleCardClick(card) {
        setSelectedCard(card);
    };

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleCardDelete(card) {
        setCardToDelete(card);
        setIsDeletePopupOpen(true);
    };

    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api
            .editAvatar(data)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateUser(user) {
        setIsLoading(true);
        api
            .editProfile(user)
            .then((userInfo) => {
                setCurrentUser(userInfo);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleAddPlaceSubmit(card) {
        setIsLoading(true);
        api
            .addCard(card)
            .then((card) => {
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() =>
                setIsLoading(false));
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) =>
            i._id === currentUser._id);
        if (!isLiked) {
            api
                .likeCard(card._id)
                .then((card) => {
                    setCards((state) =>
                        state.map((c) =>
                            (c._id === card._id ? card : c))
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api
                .removeLikeCard(card._id)
                .then((card) => {
                    setCards((state) =>
                        state.map((c) =>
                            (c._id === card._id ? card : c))
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleDeleteClick(card) {
        setIsLoading(true);
        api
            .deleteCard(card._id)
            .then(() => {
                setCards(() =>
                    cards.filter((c) =>
                        c._id !== card._id)
                );
            })
            .then(() =>
                closeAllPopups())
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className='page'>
            <CurrentUserContext.Provider value={currentUser}>
                <Routes>
                    <Route
                        path='/sign-in'
                        element={
                            <>
                                <Header title='Регистрация' link='/sign-up' />
                                <Login onLogin={handleLogin} loggedIn={loggedIn} />
                            </>
                        }
                    />
                    <Route
                        path='/sign-up'
                        element={<>
                            <Header title='Войти' link='/sign-in' />
                            <Register onRegister={handleRegister} />
                        </>}
                    />
                    <Route
                        path='/mesto-react-auth'
                        element={
                            <>
                                <Header
                                    title='Выйти'
                                    email={email}
                                    loggedIn={loggedIn}
                                    onSignOut={handleSignOut}
                                />
                                <ProtectedRoute
                                    element={Main}
                                    loggedIn={loggedIn}
                                    editProfile={handleEditProfileClick}
                                    addPlace={handleAddPlaceClick}
                                    editAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                    cards={cards}
                                />
                            </>
                        }
                    />
                    <Route
                        path='/'
                        element={
                            <>
                                <Header
                                    title='Выйти'
                                    email={email}
                                    loggedIn={loggedIn}
                                    onSignOut={handleSignOut}
                                />
                                <ProtectedRoute
                                    element={Main}
                                    loggedIn={loggedIn}
                                    editProfile={handleEditProfileClick}
                                    addPlace={handleAddPlaceClick}
                                    editAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                    cards={cards}
                                />
                                <Footer />
                            </>
                        }
                    />
                </Routes>

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    editAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    addPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                />

                <PopupWithConfirmation
                    card={cardToDelete}
                    onClose={closeAllPopups}
                    isOpen={isDeletePopupOpen}
                    isLoading={isLoading}
                    onCardDelete={handleDeleteClick}
                    isValid={true}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    isSignedUp={success}
                />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;