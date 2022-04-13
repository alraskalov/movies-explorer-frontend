import React from "react";
import "./ErrorText.css";

const ErrorText = ({ err, children }) => {
  return <span className={`error-text ${err}`}>{children}</span>;
};

export default ErrorText;
