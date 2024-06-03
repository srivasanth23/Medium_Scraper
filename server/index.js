const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const {scarpeFuntion} = require("./functions/scarpeFuntion.js");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 10000;

//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

let articlesArray = [];

//scarping medium POST method
app.post("/scrape", async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    res.status(400).json({ error: "Topic field required" });
  }

  try {
    const article = await scarpeFuntion(topic);
    articlesArray = article;
    res.json({ articles: article });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Server error _1" });
  }
});

//to get all articles
app.get("/articles", (req, res) => {
  res.json({ articles: articlesArray });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
