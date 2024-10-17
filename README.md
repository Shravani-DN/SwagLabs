# WebDriverIO Test Automation Project

This project uses **WebDriverIO** to automate testing of web and mobile applications. WebDriverIO provides a robust, extendable, and feature-rich platform for creating scalable test suites.

### Prerequisites

- **Node.js** version v18.20.0 or higher
- **NPM** (Node Package Manager) or **Yarn**
- We recommend using **NVM** (Node Version Manager) to manage multiple Node.js versions

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Shravani-DN/SwagLabs.git
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

- **To run specific test files**, add a `--spec` feature:

  ```bash
  npx wdio run wdio.conf.js --spec ./path/to/your/feature/file.feature

  ```
## Project Structure

The project follows the **Page Object Model (POM)** pattern to organize test scripts, making them more readable, maintainable, and reusable.

```
/JSFrameworkFromScratch
│
├── /features
│   ├── /helper
        ├── gestures.js
│   │   └── Utils.js
│   ├── /pageobjects
│   │   ├── dashboard.page.js
│   │   ├── login.page.js
        ├── menu.page.js
│   │   └── page.js
│   ├── /step-definitions
│   │   └── steps.js
    ├── /support
│   │   └── hooks.js
│   └── login.feature
│
├── wdio.conf.js
├── .env
├── .gitignore
├── package.json
└── README.md

```

## .env requirement

Need to create .env under the root folder
Add path of the android apk for `ANDROID_APP_PATH`

example:
```ANDROID_APP_PATH="/Users/shravanidn/Downloads/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk";```


## Useful Commands

- **Start the WebDriverIO setup**:

  ```bash
  npm init wdio .
  ```

- **Run tests**:
  ```bash
  npx wdio run ./wdio.conf.js
  ```

- **Allure Report Generation**:
  ```bash
  allure serve
  ```

## Troubleshooting

- Ensure Node.js is correctly installed and updated to the required version.
- For issues with WebDriverIO setup, consult the [official documentation](https://webdriver.io/).

## System Requirements

- Node.js v18.20.0 or higher
- Appium 2.0 or higher
- Android Studio

## Additional Resources

- [WebDriverIO Documentation](https://webdriver.io/)
- [NVM Installation Guide](https://github.com/nvm-sh/nvm)
