import React from "react";
import './styles.css'

const Card = ({ title, image, description, date }) => {
  return (
    <div className="card-main-container">
      <img className="card-image" src={image} alt="news-ilustration" />
      <div className="card-date">{date}</div>
      <div className="card-information-container">
        <p className="card-title">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
