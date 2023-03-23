import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ onClose, isOpen, onAddPlace }) => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
    setName('')
    setLink('')
  }

  return (
    <PopupWithForm
      buttonText="Создать"
      onClose={onClose}
      isOpen={isOpen}
      name="add"
      title="Новое место"
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          name="name"
          id="profile-description"
          type="text"
          className="popup__text"
          placeholder="Название"
          value={name}
          onChange={handleNameChange}
          required
        />
        <span className="popup__input-error profile-description-error"></span>
      </label>
      <label className="popup__label">
        <input
          name="link"
          id="profile-photo"
          type="url"
          className="popup__text"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleLinkChange}
          required
        />
        <span className="popup__input-error profile-photo-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
