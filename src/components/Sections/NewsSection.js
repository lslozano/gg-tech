import React from "react";
import "./styles.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const NewsSection = ({ sectionTitle, optionActive, newsData, loading, error }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage text={error} />;
  }

  let lastNews = newsData.filter((data) => data.last_news);
  let sortedLastNews = lastNews.sort((objA, objB) => {
    const {
      published_at: { date: objADate },
    } = objA;
    const {
      published_at: { date: objBDate },
    } = objB;
    return Number(new Date(objBDate)) - Number(new Date(objADate));
  });
  let lastFourNews = sortedLastNews.slice(0, 4);

  const renderCards = (data, index) => {
    const {
      title,
      image,
      short_description,
      published_at: { date },
    } = data;

    const newsDate = new Date(date);
    const newsDay = newsDate.getDate();
    const newsMonth = newsDate.getMonth();
    const newsYear = newsDate.getFullYear();
    const newsTime = `${newsDate.getHours()}:${newsDate.getMinutes()}`;

    return (
      <Card
        key={`${index}-${title}`}
        title={title}
        image={image}
        description={short_description}
        date={`${newsDay}/${newsMonth}/${newsYear} ${newsTime}`}
      />
    );
  };

  return (
    <section id="news" className="section-main-container">
      <SectionTitle title={sectionTitle} optionActive={optionActive} />
      <div className="section-cards-container">
        {lastFourNews.map((data, index) => renderCards(data, index))}
      </div>
    </section>
  );
};

export default NewsSection;
