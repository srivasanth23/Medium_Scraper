import React from "react";
import axios from "axios";
import Header from "./components/Header";
import FailureView from "./components/FailureView";
import LoaderView from "./components/LoaderView";
import Footer from "./components/Footer";
import ArticleContainer from "./components/ArticleContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [topic, setTopic] = React.useState("");
  const [articlesArray, setArticlesArray] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [isFailure, setFailure] = React.useState("");
  const [showmore, setshowmore] = React.useState(false);

  const fetchArticles = async (e) => {
    e.preventDefault();

    if (!topic) {
      toast.error("Please enter topic");
      //toast.error("Refresh the page"); //(if deployed I had used this one)
      toast.error("Server crashed, please run it again"); //(I didnt deplyed so used this one )
    }

    try {
      setLoading(true);
      setFailure(false);
      const response = await axios.post("http://localhost:8000/scrape", {
        topic,
      });
      setArticlesArray(response.data.articles);
      toast.success("Articles fetched successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setFailure(true);
    }
  };

  const handleShowMore = () => {
    setshowmore(!showmore);
  };

  const handleInput = (e) => {
    setTopic(e.target.value);
    setArticlesArray([]);
    setshowmore(false);
  };

  return (
    <div className="App">
      <Header />
      <div className="paddings div-container">
        <form onSubmit={fetchArticles}>
          <input
            type="text"
            placeholder="Enter topic"
            className="inputElem"
            data-testid="input"
            value={topic}
            onChange={handleInput}
          />
          <button data-testid="button" className="btnElem" type="submit">
            Parse
          </button>
        </form>
      </div>
      {isLoading ? <LoaderView /> : null}
      {isFailure ? <FailureView /> : null}
      <ul className="paddings ul-container">
        {(showmore ? articlesArray : articlesArray.slice(0, 5)).map((each) => (
          <ArticleContainer article={each} />
        ))}
      </ul>
      {articlesArray.length > 5 && (
        <button onClick={handleShowMore} className="showmoreBtn">
          ...Show {showmore ? "Less" : "More"}
        </button>
      )}
      <ToastContainer position="bottom-right" className="toast-container" />
      <Footer />
    </div>
  );
};

export default App;
