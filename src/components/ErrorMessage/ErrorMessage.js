import React from "react";
import "./styles.css";

const ErrorMessage = ({ text }) => {
  return <div className="error-container">Something went wrong, Error: {text}</div>;
};

export default ErrorMessage;
