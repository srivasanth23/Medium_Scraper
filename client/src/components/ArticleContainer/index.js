const ArticleContainer = ({ article }) => {
  return (
    <div className="article-container">
      <h3>{article.title}</h3>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleContainer;
