import React from "react";
import './styles.css';

const Navbar = ({ logo: Logo, links }) => {
  const renderLinks = (link, index) => {
    const { ref, name } = link

    return <a key={index} className="navbar-link" href={`#${ref}`}>{name}</a>
  }

  return (
    <div className="navbar-main-container">
      <div className="navbar-inner-container">
        <Logo className="navbar-logo" />
        <div className="navbar-links-container">
          {links.map((link, index) => renderLinks(link, index))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
