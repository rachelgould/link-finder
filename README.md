# Link Finder

Crawl a site to find pages with links that match user-defined criteria. 

The end output is a list of your website's pages, and the matching link destinations by page. Includes support for fuzzy match of multiple search terms, and ignored URLs.

**Use case:** Find links on your site that you know will become broken.

## Installation & Usage

1. Run `npm install` to include dependencies.

2. Change the file name of `inputs-example.js` to `inputs.js`.

3. Enter custom values for `startingUrl`, `searchFor`, `ignoreLinks` and `supportedHostnames`. 

4. In your CLI, run `npm run` to start your crawl.

## Dependencies

[Supercrawler](https://github.com/brendonboshell/supercrawler)

## Author

[Rachel Gould](http://rachelgould.dev)