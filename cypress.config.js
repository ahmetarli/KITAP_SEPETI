const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: true,       // HTML raporu aktif
    json: false        // JSON raporu istemiyorsan false
  },
  e2e: {
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    video: true,
    screenshotOnRunFailure: true,
    supportFile: "cypress/support/e2e.js",
  },
});
