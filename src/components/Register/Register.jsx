import React from "react";
import FormWithAuth from "../FormWithAuth/FormWithAuth";
import "./Register.css";

const Register = () => {
  return (
    <FormWithAuth
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
    />
  );
};

export default Register;
