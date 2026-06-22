const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'wdah9c',
  e2e: {
    baseUrl: "http://localhost:3000", // your frontend
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    video: true,
    screenshotOnRunFailure: true
  },
});