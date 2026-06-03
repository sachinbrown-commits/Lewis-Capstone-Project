import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'cgwuou',
  e2e: {
    experimentalStudio: true,
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
})