const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // This is the base URL for your retail application
    // Change this to match your actual website URL
    baseUrl: 'http://localhost:3000',
    
    // Where your test files live
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Support file location
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
    
    // Timeout settings (how long to wait for things)
    defaultCommandTimeout: 10000,     // 10 seconds
    pageLoadTimeout: 30000,           // 30 seconds
    requestTimeout: 10000,            // 10 seconds
    
    // Viewport (screen size for the test browser)
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Setup node events (for advanced configuration)
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      // This is where you'd add custom plugins later
    },
  },
  
  // Where screenshots and videos are saved
  screenshotsFolder: 'reports/screenshots',
  videosFolder: 'reports/videos',
  
  // Take screenshot on test failure
  screenshotOnRunFailure: true,
  
  // Record video of test runs
  video: true,
  
  // Trash old reports before each run (keeps things clean)
  trashAssetsBeforeRuns: true,
});