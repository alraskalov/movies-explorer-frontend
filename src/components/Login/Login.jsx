import React from "react";
import "./Login.css";
import FormWithAuth from "../FormWithAuth/FormWithAuth";

const Login = () => {
  return (
    <FormWithAuth
      name="login"
      title="Рады видеть!"
      buttonText="Войти"
    />
  );
};

export default Login;
