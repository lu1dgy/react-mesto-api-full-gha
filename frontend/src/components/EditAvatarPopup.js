import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarInput = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  // Обнуляем инпут
  React.useEffect(() => {
    avatarInput.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      buttonText="Сохранить"
      onClose={onClose}
      isOpen={isOpen}
      name="avatar"
      title="Обновить аватар"
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          ref={avatarInput}
          name="link"
          id="profile-avatar"
          type="url"
          className="popup__text"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error profile-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
