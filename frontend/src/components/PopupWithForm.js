import React from "react";

function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  children,
  buttonText,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ``}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-btn"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          name={`${name}-form`}
          className={`popup__form popup__form_type_${name}`}
        >
          {children}
          <button type="submit" className="popup__button popup__save-btn">
            {buttonText}
          </button>
        </form>
      </div>
      <div className="popup__overlay"></div>
    </div>
  );
}

export default PopupWithForm;
