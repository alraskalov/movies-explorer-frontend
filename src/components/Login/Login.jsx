import React, { createRef, useEffect } from "react";
import "./Login.css";
import FormWithAuth from "../FormWithAuth/FormWithAuth";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useError } from "../../hooks/useError";

const Login = ({ onLogin, isLoad, globalError }) => {
  const { values, handleChange, errors, isValid, setIsValid, setValues } =
    useFormWithValidation();
  const errorApi = useError(globalError);
  const ref = createRef();

  useEffect(() => {
    setIsValid(ref.current.checkValidity());
  }, [setIsValid, ref]);

  const handleSubmit = (e) => {
    const { email, password } = values;
    e.preventDefault();
    onLogin(
      {
        email,
        password,
      },
      () =>
        setValues({
          email: "",
          password: "",
        })
    );
  };

  return (
    <FormWithAuth
      ref={ref}
      isValid={isValid}
      errors={errors}
      name="login"
      title="Рады видеть!"
      buttonText="Войти"
      userEmail={values.email}
      userPassword={values.password}
      onSubmit={handleSubmit}
      onChange={handleChange}
      errorApi={errorApi}
      isLoad={isLoad}
    />
  );
};

export default Login;
