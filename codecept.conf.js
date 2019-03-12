exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://35.158.3.231'
    },
    REST: {
      "endpoint": "http://35.158.3.231",
      "defaultHeaders": {
        "Content-Type": "application/json"
      }
    }
  },
  include: {},
  bootstrap: null,
  mocha: {},
  name: 'MageTest'
}
