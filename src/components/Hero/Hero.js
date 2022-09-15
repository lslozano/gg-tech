import React from "react";
import './styles.css'

const Hero = ({ logo: BannerLogo, title, subtitle, description, ctaText }) => {
  return (
    <div id="hero" className="hero-main-container">
      <div className="hero-title-container">
        <BannerLogo className="hero-logo" />
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
      </div>
      <div className="hero-description-container">
        <p className="hero-description">{description}</p>
      </div>
      <button className="hero-cta">{ctaText}</button>
    </div>
  );
};

export default Hero;
