import React from "react";
import "./styles.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <p className="loader-text">Loading data, please wait</p>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
