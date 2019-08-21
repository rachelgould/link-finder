var supercrawler = require("supercrawler");
let { startingUrl, searchFor, ignoreLinks, supportedHostnames } = require('./inputs.js');
let finalList = [];
var crawler = new supercrawler.Crawler({
  // Tme (ms) between requests
  interval: 500,
  // Maximum number of requests at any one time.
  concurrentRequestsLimit: 10,
  // Time (ms) to cache the results of robots.txt queries.
  robotsCacheTime: 3600000,
  // Query string to use during the crawl.
  userAgent: "Mozilla/5.0 (compatible; supercrawler/1.0; +https://github.com/brendonboshell/supercrawler)",
  // Custom options to be passed to request.
  request: {
    headers: {
      'x-custom-header': 'example'
    }
  }
});

// Get "Sitemaps:" directives from robots.txt
crawler.addHandler(supercrawler.handlers.robotsParser());

// Crawl sitemap files and extract their URLs.
crawler.addHandler(supercrawler.handlers.sitemapsParser());

// Pick up <a href> links from HTML documents
crawler.addHandler("text/html", supercrawler.handlers.htmlLinkParser({
  hostnames: supportedHostnames,
  urlFilter: function (url) {
    return includeUrl(url)
  }
}));
 
// Custom content handler for HTML pages.
crawler.addHandler("text/html", function (context) {
  let currentUrl = context.url;
  if (includeUrl(currentUrl)) {
    let links = getLinks(context);
    let thisList = {};
    thisList[currentUrl] = links
    if (links.length >= 1) {
      finalList.push(thisList)
      console.log(`Finished with ${currentUrl}. Relevant links were found.`)
    } else {
      console.log(`Finished with ${currentUrl}. No relevant links found.`)
    }
    let queueLength = crawler.getUrlList()._list.length
    console.log(`${queueLength} URLs currently in the queue`)
  } else {
    console.log("Skipping excluded page...")
  }
});

const getLinks = context => {
  let links = [];
  context.$('a').each((index, link) => {
    url = link.attribs.href || null;
    if (url && detectUrl(url)) {
      links.push(url);
    }
  });
  return links;
}

const includeUrl = url => {
  if (!ignoreLinks || ignoreLinks.length === 0) {
    return true;
  } else if (ignoreLinks.some(ignoredLink => url.includes(ignoredLink))) {
    return false;
  } else {
    return true;
  }
}

const detectUrl = url => {
  return searchFor.some(matchText => url.includes(matchText)) && !ignoreLinks.some(ignoredLink => url.includes(ignoredLink));
}

crawler.on('urllistcomplete', () => {
  console.log("Crawl Finished!")
  console.log(finalList)
  crawler.stop();
})

crawler.getUrlList()
  .insertIfNotExists(new supercrawler.Url(startingUrl))
  .then(function () {
    return crawler.start();
  });