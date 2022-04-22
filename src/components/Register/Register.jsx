import React, { createRef, useEffect} from "react";
import { useError } from "../../hooks/useError";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import FormWithAuth from "../FormWithAuth/FormWithAuth";
import "./Register.css";

const Register = ({ onRegister, globalError, isLoad }) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    setValues,
  } = useFormWithValidation();
  const errorApi = useError(globalError);
  const ref = createRef();

  useEffect(() => {
    setIsValid(ref.current.checkValidity());
  }, [setIsValid, ref]);

  const handleSubmit = (e) => {
    const { email, password, name } = values;
    e.preventDefault();
    onRegister(
      {
        email,
        name,
        password,
      },
      () =>
        setValues({
          email: "",
          name: "",
          password: "",
        })
    );
  };

  return (
    <FormWithAuth
      ref={ref}
      isValid={isValid}
      errors={errors}
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      userEmail={values.email}
      userName={values.name}
      userPassword={values.password}
      onSubmit={handleSubmit}
      onChange={handleChange}
      errorApi={errorApi}
      isLoad={isLoad}
    />
  );
};

export default Register;
