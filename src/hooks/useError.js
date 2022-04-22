import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useError(globalError) {
  const { pathname } = useLocation();
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
        break;
      default:
        setGlobalErrorText("");
        break;
    }

    // if (globalError === 400) setGlobalErrorText("Введенные данные некорректны");
    // if (globalError === 500)
    //   setGlobalErrorText(
    //     "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
    //   );
    // if (globalError === 409)
    //   setGlobalErrorText("Пользователь с таким E-mail уже зарегестрирован");
    // if (globalError === 401) setGlobalErrorText("Неверный логин или пароль");
    // if (globalError === 200) setGlobalErrorText("");
    return () => setGlobalErrorText("");
  }, [globalError, pathname]);

  return globalErrorText;
}
