import { useState, useEffect } from "react";

export function useError(globalError) {
  const [globalErrorText, setGlobalErrorText] = useState("");
  useEffect(() => {
    switch (globalError) {
      case 400:
        setGlobalErrorText("Введенные данные некорректны");
        break;
      case 401:
        setGlobalErrorText("Неверный логин или пароль");
        break;
      case 409:
        setGlobalErrorText("Пользователь с таким E-mail уже зарегестрирован");
        break;
      case 500:
        setGlobalErrorText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        alert(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        break;
      default:
        setGlobalErrorText("");
        break;
    }
  }, [globalError]);

  return globalErrorText;
}
