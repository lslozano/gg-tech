import React from "react";
import "./styles.css";

const SectionTitle = ({ title, optionActive }) => {
  return (
    <div className="section-header-container">
      <div className="section-title-container">
        <p className="section-title">{title}</p>
        <div className="bottom-bar"></div>
        <div className="right-square"></div>
      </div>
      {optionActive ? (
        <p
          className="section-view-more"
          onClick={() => alert("Function not yet implemented")}
        >
          VIEW MORE
        </p>
      ) : null}
    </div>
  );
};

export default SectionTitle;
