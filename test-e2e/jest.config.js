module.exports = {
  preset: 'jest-puppeteer',

  globals: {
    URL: 'http://localhost:8001/'
  },

  testMatch: [
      '**/specs/**/*.spec.js'
  ],

  verbose: true
}
