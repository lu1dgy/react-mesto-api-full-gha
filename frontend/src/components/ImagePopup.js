import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_photo ${card.name ? `popup_opened` : ``}`}
    >
      <div className="popup__window">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-btn"
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__image-name">{card.name}</p>
      </div>
      <div className="popup__overlay"></div>
    </div>
  );
}

export default ImagePopup;
