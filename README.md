# WebDriverIO Test Automation Project

This project uses **WebDriverIO** to automate testing of web and mobile applications. WebDriverIO provides a robust, extendable, and feature-rich platform for creating scalable test suites.

### Prerequisites

- **Node.js** version 12.16.1 or higher
- **NPM** (Node Package Manager) or **Yarn**
- We recommend using **NVM** (Node Version Manager) to manage multiple Node.js versions

### Installation

1. **Clone the Repository:**

   ```bash
   git clone <your-repository-url>
   cd <your-project-directory>
   ```

2. **Install Dependencies:**
   If you're using NPM:
   ```bash
   npm install
   ```
   Or if you're using Yarn:
   ```bash
   yarn install
   ```

### Setting Up WebDriverIO

1. **Initiate WebDriverIO Setup**:
   To add a full WebDriverIO setup, run the following commands:

   - Using NPM:
     ```bash
     npm init wdio .
     ```

### Running Tests

- **To execute all tests**, use:

  ```bash
  npx wdio run ./wdio.conf.js
  ```

- **To run specific test files**, add a `--spec` parameter:

  ```bash
  npx wdio run ./wdio.conf.js --spec example.e2e.js
  ```

- **To run a specific test suite**, use:
  ```bash
  npx wdio run ./wdio.conf.js --suite exampleSuiteName
  ```

## Project Structure

The project follows the **Page Object Model (POM)** pattern to organize test scripts, making them more readable, maintainable, and reusable.

```
/JSFrameworkFromScratch
│
├── /features
│   ├── /helper
│   │   └── Utils.js
│   ├── /pageobjects
│   │   ├── login.page.js
│   │   ├── page.js
│   │   └── secure.page.js
│   ├── /step-definitions
│   │   └── steps.js
│   └── login.feature
│
├── /allure-results
├── /wdio.conf.js
├── package.json
└── README.md

```

## Key Features of WebDriverIO

- **Extendable**: Easily add helper functions or complex command sets.
- **Compatible**: Supports WebDriver Protocol for cross-browser testing and Chrome DevTools Protocol for Chromium-based automation.
- **Feature Rich**: Integration with a variety of plugins and tools.

## Useful Commands

- **Start the WebDriverIO setup**:

  ```bash
  npm init wdio .
  ```

- **Run tests**:
  ```bash
  npx wdio run ./wdio.conf.js
  ```

## Troubleshooting

- Ensure Node.js is correctly installed and updated to the required version.
- For issues with WebDriverIO setup, consult the [official documentation](https://webdriver.io/).

## System Requirements

- Node.js v18.20.0 or higher

## Additional Resources

- [WebDriverIO Documentation](https://webdriver.io/)
- [NVM Installation Guide](https://github.com/nvm-sh/nvm)
