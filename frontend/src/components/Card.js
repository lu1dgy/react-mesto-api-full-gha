import React from 'react'

import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({ name, link, likes, onCardClick, owner, onCardLike, _id, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = (owner._id || owner)  === currentUser._id
  const isLiked = likes.some((i) => i._id === currentUser._id)
  const cardLikeButtonClassName = `card-item__like-btn ${isLiked ? 'card-item__like-btn_active' : ''}`

  function handleClick() {
    onCardClick({ name, link })
  }

  function handleLikeClick() {
    onCardLike({ likes, _id })
  }

  function handleDeleteClick() {
    onCardDelete(_id)
  }
  return (
    <li className='card-item'>
      <img
        onClick={handleClick}
        className='card-item__image'
        alt={name}
        src={link}
      />
      <div className='card-item__info'>
        <h2 className='card-item__text'>{name}</h2>
        <div className='card-item__like-section'>
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type='button'></button>
          <p className='card-item__like-counter'>{likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          onClick={handleDeleteClick}
          type='button'
          className='card-item__delete-btn'></button>
      )}
    </li>
  )
}

export default Card
