const puppeteer = require("puppeteer");

async function scarpeFuntion(topic) {
  //Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  //seting user-agest to bypass login-stuff
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/0.0.0.0 Safari/537.36"
  );

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

      const spanElem = article.querySelectorAll("span");

      spanCount = spanElem.length;
      if (spanCount == 13) {
        //premium article
        date = spanElem[6].innerText;
        if (date) {
          readTime = spanElem[3].innerText;
          premium = "true";
        }
      } else if (spanCount == 11) {
        //non-premium article
        date = spanElem[4].innerText;
        if (date) {
          readTime = spanElem[1].innerText;
          premium = "false";
        }
      } else if (spanCount === 12) {
        //posted just now
        date = "some hours ago";
        readTime = spanElem[3].innerText;
        premium = null;
      } else {
        date = null;
        readTime = null;
        premium = null;
      }

      // ------ Please ignore below code ------
      // const dateElem = spanElem.length <= 4 ? spanElem[4].innerText : spanElem[6].innerText;
      // const date = dateElem === "." ? null : dateElem;

      // if (spanElem.length >= 5) {
      //   if (spanElem.length <= 5) {
      //     // Non-premium article:
      //     readTime = "Premium";
      //     date = "Premium";
      //   } else if (spanElem.length >= 7) {
      //     // Premium article:
      //     readTime = spanElem[1].innerText;
      //     date = spanElem[4].innerText;
      //   }
      // }

      // const readTimeElem = spanElem[3].innerText;
      // const readTime = readTimeElem === "." ? null : readTimeElem;

      const linkElement = article.querySelector('div[role="link"]');
      const link = linkElement ? linkElement.getAttribute("data-href") : null;

      // Add the article data to the array
      if (title && author && link) {
        articleData.push({
          spanCount,
          title,
          author,
          link,
          date,
          readTime,
          premium,
        });
      }
    });

    // Returns all the articles (we will slice in frontend)
    return articleData;
  });
  await browser.close();
  return articles;
}

module.exports = { scarpeFuntion };
