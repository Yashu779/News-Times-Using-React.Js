import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);
  //document.title = `${this.capitalizeFristLetter(props.category)}-NewsTimes`

  const updateNews = async () => {
    props.setProgress(100);
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=1fb750f5f157419b922a83c6c6dad3ce&pagesize=${props.pageSize} &page=${page}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResult(parsedData.totalResult);
    setLoading(false);

    const capitalizeFristLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  };
  useEffect(() => {
    updateNews();
  }, []);

  const handelPreClick = async () => {
    setPage(page - 1);
    updateNews();
  };

  const handelNextClick = async () => {
    setPage(page + 1);
    updateNews();
  };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
      props.category
    }&apiKey=1fb750f5f157419b922a83c6c6dad3ce&pagesize=${
      props.pageSize
    } &page=${page + 1}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResult(parsedData.totalResult);
  };

  return (
    <div>
      <h2
        className="my-4 mx-50 text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        <b>Top-Headlines from {props.category}"</b>
      </h2>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResult}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title.slice(0, 45)}
                    description={element.description}
                    source={element.source.name}
                    imageUrl={element.urlToImage}
                    url={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {};
News.propTypes = {};

export default News;
