import "./index.css";
import React from "react";
import { PiStarFourFill } from "react-icons/pi";

const ArticleContainer = ({ article }) => {
  return (
    <div
      onClick={() => window.open(article.link, "_blank")}
      className="article-container"
    >
      <h3 className="article-title">{article.title}</h3>
      <p style={{ marginBottom: "12px", fontSize: "12px" }}>
        Posted by {article.author}
      </p>
      <div className="date-container">
        <span> {article.date} </span>
        <span> {article.readTime} </span>
      </div>
      {article.premium === "true" ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <PiStarFourFill style={{ color: "gold", marginRight: "5px" }} />
          <span style={{ fontSize: "12px" }}>Premium</span>
        </div>
      ) : null}
    </div>
  );
};

export default ArticleContainer;

//title, author, link, date
//      <PiStarFourFill style={{ color: "gold", marginRight: "5px" }} />
