import React from "react";
import "./styles.css";
import { ReactComponent as ArrowLeft } from "../../images/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../images/arrow-right.svg";

const Pagination = ({
  loading,
  newsPerPage,
  totalNews,
  currentPage,
  paginate,
  prevPage,
  nextPage,
}) => {
  if (loading) return null;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-navbar-container">
      <ArrowLeft className="arrow-img" onClick={() => prevPage(currentPage)} />
      <ul className="pagination-ul-container">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`list-element ${
              number === currentPage ? "list-element-active" : ""
            }`}
          >
            <a onClick={() => paginate(number)} href="!#articles">
              {number}
            </a>
          </li>
        ))}
      </ul>
      <ArrowRight
        className="arrow-img"
        onClick={() => nextPage(currentPage, pageNumbers.length)}
      />
    </nav>
  );
};

export default Pagination;
