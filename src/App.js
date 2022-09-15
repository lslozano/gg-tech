import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import NewsSection from "./components/Sections/NewsSection";
import ArticlesSection from "./components/Sections/ArticlesSection";
import Pagination from "./components/Pagination/Pagination";
import { ReactComponent as BrandLogo } from "./images/gg-logo.svg";
import { ReactComponent as BannerLogo } from "./images/banner-logo.svg";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(8);
  const [searchArticle, setSearchArticle] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://fakerapi.it/api/v1/custom?title=text&image=image&short_description=text&published_at=date_time&last_news=boolean&_quantity=100"
        );
        if (!response.ok) {
          throw new Error(`Error encountered: Status is ${response.status}`);
        }
        const result = await response.json();
        setData(result.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  let navbarLinks = [
    {
      name: "Hero",
      ref: "hero",
    },
    {
      name: "News",
      ref: "news",
    },
    {
      name: "Article",
      ref: "articles",
    },
  ];

  // Set initial news
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews =
    searchResults.length > 0
      ? searchResults.slice(indexOfFirstNews, indexOfLastNews)
      : data.slice(indexOfFirstNews, indexOfLastNews);

  // Change pages
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = (pageNumber) => {
    if (pageNumber === 1) return null;

    return setCurrentPage(pageNumber - 1);
  };

  const nextPage = (pageNumber, pageNumbersLength) => {
    if (pageNumber === pageNumbersLength) return null;

    return setCurrentPage(pageNumber + 1);
  };

  const handleSubmit = (search) => {
    if (search === "") {
      setSearchArticle("");
      return setSearchResults([]);
    }

    setSearchArticle(search);
    let filteredNews = data.filter((news) =>
      news.title.toLowerCase().includes(searchArticle.toLowerCase())
    );
    return setSearchResults(filteredNews);
  };

  const handleChange = (event) => {
    if (event.target.value === "") {
      setSearchArticle("");
      return setSearchResults([]);
    }

    setSearchArticle(event.target.value);
    let filteredNews = data.filter((news) =>
      news.title.toLowerCase().includes(searchArticle.toLowerCase())
    );
    return setSearchResults(filteredNews);
  };

  return (
    <div className="main-container">
      <Navbar logo={BrandLogo} links={navbarLinks} />
      <Hero
        logo={BannerLogo}
        title="BLACK MESA"
        subtitle="RESEARCH FACILITY"
        description="“Working to make a better tomorrow for all mankind”"
        ctaText="MORE INFORMATION"
      />
      <NewsSection
        sectionTitle="LAST NEWS"
        optionActive
        newsData={data}
        loading={loading}
        error={error}
      />
      <ArticlesSection
        sectionTitle="MORE ARTICLES"
        data={data}
        newsData={currentNews}
        loading={loading}
        error={error}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        searchArticle={searchArticle}
      />
      <Pagination
        loading={loading}
        newsPerPage={newsPerPage}
        totalNews={searchResults.length > 0 ? searchResults.length : data.length}
        currentPage={currentPage}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
};

export default App;
