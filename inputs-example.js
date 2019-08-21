module.exports = {
  // The URL where the spider will start its search:
  startingUrl: 'http://example.com',

  // The script will match with any links that contain these strings of text:
  searchFor: ['matchThis', 'andThis'],

  // If you want to ignore specific links that would otherwise be matched, enter the full link or text that the link contains:
  // (If you don't want to ignore any, replace with an empty array: [])
  ignoreLinks: ['wontMatchThis', 'orThis'],
  
  // Restricts discovered links to the following hostnames:
  supportedHostnames: ['example.com', 'example2.com']
}