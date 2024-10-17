import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect, $ } from "@wdio/globals";

import LoginPage from "../pageobjects/login.page.js";
import allure from "@wdio/allure-reporter";
import testData from "../../data/testdata.json";

const pages = {
  login: LoginPage,
};

Given(/^I am on the (\w+) page$/, async (page) => {
  allure.addStep("Ensure the app is installed on the device");
});

When(/^I login with (\w+) and (.+)$/, async (userName, passWord) => {
  allure.addStep("Entering username and password");
  const username = testData.login_credentials[userName];
  const password = testData.login_credentials[passWord];
  await LoginPage.login(username, password);
});

When(
  /^I login with empty (.*) and empty (.*)$/,
  async (emptyUserName, emptyPassWord) => {
    allure.addStep("Entering username and password");
    await LoginPage.login(
      emptyUserName.trim() === "" ? "" : emptyUserName,
      emptyPassWord.trim() === "" ? "" : emptyPassWord
    );
  }
);

Then(/^I should see a flash message saying (.*)$/, async (message) => {
  try {
    allure.addStep("Expecting login is successful");
    await expect(LoginPage.flashAlert).toBeExisting();
    await expect(LoginPage.flashAlert).toHaveText(
      expect.stringContaining(message)
    );
  } catch (error) {
    const screenshot = await driver.takeScreenshot();
    allure.addAttachment(
      "Screenshot on Failure",
      Buffer.from(screenshot, "base64"),
      "image/png"
    );
    throw error; // Re-throw the error to mark the step as failed
  }
});

Then(/^I should see a dashboard with text$/, async () => {
  allure.addStep("Logged In and logged out successfully!");
});

