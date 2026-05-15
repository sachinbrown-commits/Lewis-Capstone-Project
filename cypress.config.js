const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'wdah9c',
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
