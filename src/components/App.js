import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import auth from '../utils/auth.js';
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
    const [isInfoTooltipOpen, setInfoTTOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmailUser] = useState('');
    const [enter, setEnter] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loggedIn &&
            Promise.all([api.getUserInfoApi(), api.getInitialCards()])
                .then(([user, cardData]) => {
                    setCurrentUser(user);
                    setCards(cardData)
                })
                .catch((err) => {
                    console.log(err);
                });
    }, [loggedIn]);

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

    function handleLogin(email, password) {
        auth
            .authorize(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setLoggedIn(true);
                    navigate('/', { replace: true });
                }
            })
            .catch((err) => {
                setInfoTTOpen(true)
                setEnter(false)
                console.log(err);
            })
    }

    function handleRegister(values) {
        auth
            .register(values.email, values.password)
            .then((res) => {
                setEnter(true);
                localStorage.setItem('jwt', res.jwt);
                setLoggedIn(true);
                navigate('/sign-in', { replace: true });
                console.log(res);
            })
            .catch((err) => {
                setEnter(false);
                console.log(err);
            })
            .finally(() =>
                setInfoTTOpen(true));
    }

    function checkToken() {
        const token = localStorage.getItem("jwt")
        if (token) {
            auth
                .getToken(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setEmailUser(res.data.email);
                        navigate('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    useEffect(() => {
        checkToken();
    }, [loggedIn]);

    function handleSingOut() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
    }

    useEffect(() => {
        if (isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || selectedCard || isDeletePopupOpen || isInfoTooltipOpen) {
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
        setInfoTTOpen(false);
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
                    <Route path='/sign-in'
                        element={
                            <>
                                <Header title='Регистрация' link='/sign-up' />
                                <Login onLogin={handleLogin} loggedIn={loggedIn} />
                            </>
                        }
                    />
                    <Route path='/sign-up'
                        element={<>
                            <Header title='Войти' link='/sign-in' />
                            <Register onRegister={handleRegister} />
                        </>}
                    />
                    <Route path='/'
                        element={
                            <>
                                <Header
                                    title='Выйти'
                                    email={email}
                                    loggedIn={loggedIn}
                                    onSignOut={handleSingOut}
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
                    isSignedUp={enter}
                />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;