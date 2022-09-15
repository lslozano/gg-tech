import React from "react";
import "./styles.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ReactComponent as SearchIcon } from "../../images/magnifying-glass.svg";

const ArticlesSection = ({
  sectionTitle,
  data,
  newsData,
  loading,
  error,
  handleSubmit,
  handleChange,
  searchArticle,
}) => {
  if (loading) return <Loader />;
  if (error) return <ErrorMessage text={error} />;

  let sortedNews = newsData.sort((objA, objB) => {
    const {
      published_at: { date: objADate },
    } = objA;
    const {
      published_at: { date: objBDate },
    } = objB;
    return Number(new Date(objBDate)) - Number(new Date(objADate));
  });

  const renderTableData = (data, index) => {
    const {
      title,
      short_description,
      published_at: { date },
    } = data;

    const newsDate = new Date(date);
    const newsDay = newsDate.getDate();
    const newsMonth = newsDate.getMonth();
    const newsYear = newsDate.getFullYear().toString().slice(-2);

    const renderTitle = (title) => {
      if (title.length > 17) {
        return <td className="row-title">{`${title.slice(0, 17)}...`}</td>;
      }

      return <td className="row-title">{title}</td>;
    };

    const renderDescription = (description) => {
      if (description.length > 79) {
        return (
          <td className="row-description">{`${description.slice(
            0,
            80
          )}...`}</td>
        );
      }

      return <td className="row-description">{description}</td>;
    };

    return (
      <tr key={index} className="table-row">
        {renderTitle(title)}
        {renderDescription(short_description)}
        <td>
          {newsDay}/{newsMonth}/{newsYear}
        </td>
      </tr>
    );
  };

  return (
    <section id="articles" className="section-main-container">
      <SectionTitle title={sectionTitle} />
      <div className="input-container">
        <SearchIcon
          className="search-icon"
          onClick={() => handleSubmit(searchArticle)}
        />
        <input
          type="text"
          id="search-article"
          className="input-search"
          name="search"
          value={searchArticle}
          placeholder="Search articles..."
          onChange={(event) => handleChange(event)}
        />
      </div>
      <table className="table">
        <thead className="table-head">
          <tr>
            <th className="table-header">NAME</th>
            <th className="table-header">DESCRIPTION</th>
            <th className="table-header">DATE</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {sortedNews.map((news, index) => renderTableData(news, index))}
        </tbody>
      </table>
    </section>
  );
};

export default ArticlesSection;
