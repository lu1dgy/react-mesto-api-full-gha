import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";
const InfoTooltip = ({ isOpen, onClose, status }) => {
  return (
    <div className={`popup popup_type_photo ${isOpen ? `popup_opened` : ``}`}>
      <div className="popup__container">
        <img
          className="popup__status"
          src={status ? success : fail}
          alt={status ? "Успешно" : "Ошибка"}
        />
        <h2 className="popup__status-text">
          {status
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз"}
        </h2>
        <button onClick={onClose} type="button" className="popup__close-btn" />
      </div>
      <div className="popup__overlay"></div>
    </div>
  );
};

export default InfoTooltip;
