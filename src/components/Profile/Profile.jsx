import React, { useState } from "react";
import ErrorText from "../ErrotText/ErrorText";
import "./Profile.css";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const edit = ({ bool }) => {
    isEdit ? setIsEdit(false) : setIsEdit(true);
  };
  return (
    <section className="profile page__profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form name="profile" className="profile__form">
        <fieldset className="profile__fieldset">
          <label className="profile__label">
            Имя
            <input
              type="text"
              id="name"
              name="name"
              className="profile__input"
              minLength="2"
              maxLength="30"
              value="Виталий"
              required
              disabled
            />
          </label>
          <label className="profile__label">
            E-mail
            <input
              type="email"
              id="email"
              name="email"
              className="profile__input"
              value="pochta@yandex.ru"
              required
              disabled
            />
          </label>
          {isEdit ? (
            <>
              <ErrorText err="profile-err">
                При обновлении профиля произошла ошибка.
              </ErrorText>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  edit(false);
                }}
                className="profile__save profile__save_disabled hover-btn"
              >
                Сохранить
              </button>
            </>
          ) : (
            <>
              <button onClick={() => edit(true)} className="profile__edit btn">
                Редактировать
              </button>
              <button className="profile__logout btn">Выйти из аккаунта</button>
            </>
          )}
        </fieldset>
      </form>
    </section>
  );
};

export default Profile;
