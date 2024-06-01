const puppeteer = require("puppeteer");

async function scarpeFuntion(topic) {
  //Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  //seting user-agest to bypass login-stuff
  // await page.setUserAgent(
  //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/0.0.0.0 Safari/537.36"
  // );

  const query = encodeURIComponent(topic);
  const url = `https://medium.com/search?q=${query}`;

  //Navigate the page to a URL
  await page.goto(url, { waitUntil: "networkidle2" });

  //---Ignore below comments for now---
  //const result = await page.content();
  //const result = await page.evaluate(() => document.title)
  //const result = await page.evaluate(() => document.body.innerText)
  //const result = await page.evaluate(() => Array.from(document.querySelectorAll("a"), (a) => a.href));

  const articles = await page.evaluate(() => {
    const articleElements = document.querySelectorAll("article");

    const articleData = [];
    articleElements.forEach((article) => {
      //Get the title, author, publishion date, URL of the article
      const titleElement = article.querySelector("h2");
      const title = titleElement ? titleElement.innerText : null;

      const authorElement = article.querySelector("p");
      const author = authorElement ? authorElement.innerText : null;

      const spanElement = article.querySelectorAll("span");
      const date =
        spanElement.length >= 4
          ? spanElement[4].innerText
          : spanElement[6].innerText;
      //const readTime = spanElement.length >= 3 ? spanElement[1].innerText : null;

      const linkElement = article.querySelector('a[rel="noopener follow"]');
      const link = linkElement ? linkElement.href : null;

      // Add the article data to the array
      if (title && author && link) {
        articleData.push({ title, author, link, date });
      }
    });

    // Returns all the articles (we will slice in frontend)
    return articleData;
  });
  await browser.close();
  return articles;
}

module.exports = { scarpeFuntion };
