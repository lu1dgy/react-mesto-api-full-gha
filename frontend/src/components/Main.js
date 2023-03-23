import React from 'react'

import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, handleCardLike, handleCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)
  return (
    <main>
      <section className='profile'>
        <div className='profile__card'>
          <div className='profile__container'>
            <img
              onClick={onEditAvatar}
              className='profile__avatar'
              alt='аватар'
              src={currentUser.avatar}
            />
          </div>
          <div className='profile__info'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className='profile__edit-btn'
              type='button'></button>
            <p className='profile__role'>{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className='profile__add-btn'
          type='button'></button>
      </section>
      <section className='card'>
        <ul className='card__items'>
          {cards.length !== 0 &&
            cards.map((card) => {
              return (
                <Card
                  onCardLike={handleCardLike}
                  onCardClick={onCardClick}
                  onCardDelete={handleCardDelete}
                  key={card._id}
                  {...card}
                />
              )
            })}
        </ul>
      </section>
    </main>
  )
}

export default Main
