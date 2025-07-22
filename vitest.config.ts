import { defineConfig } from 'vitest/config'
//import electron from '@vitest/electron-plugin'

export default defineConfig({
  test: {
    // Test environment for Electron renderer process
    // environment: 'happy-dom',
    // Or for main process testing:
    environment: 'node',

    // Include Electron-specific setup

    // Other Vitest options
    include: ['src/main/**/*.{test,spec}.{ts}'],
    globals: true
  }
})
