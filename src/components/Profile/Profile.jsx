import React, { createRef, useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useError } from "../../hooks/useError";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ErrorText from "../ErrotText/ErrorText";
import "./Profile.css";

const Profile = ({ onLogout, onUpdateUser, globalError, isLoad }) => {
  const { name, email } = useContext(CurrentUserContext);
  const {
    values,
    handleChange,
    errors,
    isValid = false,
    setIsValid,
    setValues,
  } = useFormWithValidation();

  const [isEdit, setIsEdit] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const errorApi = useError(globalError);

  const ref = createRef();

  useEffect(() => {
    setValues({
      name: name,
      email: email,
    });
  }, [name, email]);

  useEffect(() => {
    setIsValid(ref.current.checkValidity());
  }, [setIsValid, ref]);

  const handleSwitch = () => {
    isEdit ? setIsEdit(false) : setIsEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = values;
    onUpdateUser(
      {
        name,
        email,
      },
      () => {
        setIsEdit(false);
        alert("Данные успешно изменены");
      }
    );
  };
  const validEmail = (e) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(e.target.value)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };
  return (
    <section className="profile page__profile">
      <h2 className="profile__title">Привет, {name}!</h2>
      <form
        ref={ref}
        noValidate
        onSubmit={handleSubmit}
        name="profile"
        className="profile__form"
      >
        <fieldset className="profile__fieldset">
          <div className="profile__label-container">
            <label className="profile__label">
              Имя
              <input
                type="text"
                id="name"
                name="name"
                className="profile__input"
                minLength="2"
                maxLength="30"
                value={values.name || ""}
                onChange={handleChange}
                required
                disabled={!isEdit || isLoad}
              />
            </label>
            <ErrorText err="input-err">{errors.name || ""}</ErrorText>
          </div>
          <div className="profile__label-container">
            <label className="profile__label">
              E-mail
              <input
                type="email"
                id="email"
                name="email"
                className="profile__input"
                value={values.email || ""}
                onChange={(e) => {
                  handleChange(e);
                  validEmail(e);
                }}
                required
                disabled={!isEdit || isLoad}
              />
            </label>
            <ErrorText err="input-err">{errors.email || ""}</ErrorText>
            <ErrorText err="err-auth">
              {isValidEmail
                ? "E-mail должен быть в формате: 'example@mail.com'"
                : ""}
            </ErrorText>
          </div>

          {isEdit ? (
            <div className="profile__button-container">
              <ErrorText err="profile-err">{errorApi || ""}</ErrorText>
              <button
                type="submit"
                className={`profile__save ${
                  isValid &&
                  !isLoad &&
                  !isValidEmail &&
                  !(values.email === email && values.name === name)
                    ? ""
                    : "profile__save_disabled"
                } hover-btn`}
                disabled={!isValid && !isLoad}
              >
                Сохранить
              </button>
            </div>
          ) : (
            <>
              <button onClick={handleSwitch} className="profile__edit btn">
                Редактировать
              </button>
              <button className="profile__logout btn" onClick={onLogout}>
                Выйти из аккаунта
              </button>
            </>
          )}
        </fieldset>
      </form>
    </section>
  );
};

export default Profile;
