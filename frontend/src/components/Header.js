import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import logo from '../images/header-logo.svg'
import burger from '../images/burger.svg'
import closeIcon from '../images/close-icon.svg'
function Header({ signOut, email }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(true)
  return (
    <header className='header'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <div className='header__menu'>
                <img
                  className='header__logo'
                  src={logo}
                  alt='логотип место'
                />
                <img
                  onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
                  className={isBurgerMenuOpen ? 'header__burger' : 'header__close-icon'}
                  src={isBurgerMenuOpen ? burger : closeIcon}
                  alt='меню бургер'
                />
              </div>
              <div
                className={`header__container ${
                  isBurgerMenuOpen ? 'header__container_hide' : 'header__container_show'
                }`}>
                <p className='header__email'>{email}</p>
                <Link
                  to='/sign-in'
                  className='header__exit-btn'
                  onClick={signOut}>
                  Выйти
                </Link>
              </div>
            </>
          }
        />
        <Route
          path='sign-in'
          element={
            <div className='header_row'>
              <img
                className='header__logo'
                src={logo}
                alt='логотип место'
              />
              <Link
                to='/sign-up'
                className='header__link'>
                Регистрация
              </Link>
            </div>
          }
        />
        <Route
          path='sign-up'
          element={
            <div className='header_row'>
              <img
                className='header__logo'
                src={logo}
                alt='логотип место'
              />
              <Link
                to='/sign-in'
                className='header__link'>
                Войти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  )
}

export default Header
