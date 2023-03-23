import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ onClose, isOpen, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      onClose={onClose}
      isOpen={isOpen}
      name="profile"
      title="Редактировать профиль"
    >
      <label className="popup__label">
        <input
          minLength="2"
          maxLength="40"
          name="name"
          id="profile-name"
          type="text"
          className="popup__text"
          placeholder="Имя"
          value={name}
          onChange={handleNameChange}
          required
        />
        <span className="popup__input-error profile-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          minLength="2"
          maxLength="200"
          name="about"
          id="profile-role"
          type="text"
          className="popup__text"
          placeholder="Вид деятельности"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <span className="popup__input-error profile-role-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
