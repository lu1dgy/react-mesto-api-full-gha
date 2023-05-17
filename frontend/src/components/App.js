import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import logo from '../images/avatar.jpg';

import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { authorize, checkToken, register, signout } from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [emailName, setEmailName] = React.useState('');

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({
    name: 'Загрузка...',
    about: 'Загрузка...',
    avatar: logo,
  });
  // Проверяем токен
  React.useEffect(() => {
    checkToken()
      .then((data) => {
        setEmailName(data.email);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  const handleLogin = (email, password) => {
    authorize(email, password)
      .then(() => {
        setEmailName(email);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        setIsSuccess(false);
        setisInfoTooltipOpen(true);
        console.log(err);
      });
  };
  const handleRegister = (email, password) => {
    register(email, password)
      .then((data) => {
        if (data) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setisInfoTooltipOpen(true);
      });
  };

  function handleSignOut() {
    signout()
      .then(() => {
        setLoggedIn(false);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(obj) {
    api
      .postUserCard(obj)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike({ likes, _id }) {
    const isLiked = likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(_id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === _id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(_id) {
    api
      .removeCard(_id)
      .then(() => {
        setCards((newCards) => newCards.filter((item) => _id !== item._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(obj) {
    api
      .setUserInfo(obj)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(obj) {
    api
      .getUserAvatar(obj.avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardClick = (obj) => {
    setSelectedCard({ name: obj.name, link: obj.link });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisInfoTooltipOpen(false);
    setSelectedCard({});
  };

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getData()
        .then(([user, data]) => {
          setCurrentUser(user);
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header signOut={handleSignOut} email={emailName} />
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute
              element={Main}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
              loggedIn={loggedIn}
            />
          }
        />
        <Route path='/sign-up' element={<Register handleRegister={handleRegister} />} />
        <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />

        <Route
          path='/'
          element={loggedIn ? <Navigate to='/' replace /> : <Navigate to='/sign-in' replace />}
        />
      </Routes>
      <Footer />
      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />
      <AddPlacePopup
        onAddPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={false}
        name='confirm'
        title='Вы уверены?'
        buttonText='Да'
      ></PopupWithForm>
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <InfoTooltip isOpen={isInfoTooltipOpen} status={isSuccess} onClose={closeAllPopups} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
