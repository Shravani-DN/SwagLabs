import { After, AfterAll } from '@cucumber/cucumber';
import DashboardPage from "../pageobjects/dashboard.page.js";
import MenuPage from "../pageobjects/menu.page.js";

After(async function (scenario) {
    const scenarioName = scenario.pickle.name;       // Get the scenario name
    const scenarioStatus = scenario.result.status;    // Get the scenario status

    console.log(`Scenario: ${scenarioName}`);
    console.log(`Status: ${scenarioStatus}`);
    if (scenarioName === 'Login with valid username and password' && scenarioStatus === 'PASSED') {
        await DashboardPage.menuClick();
        await MenuPage.logOutClick();
    }

    if (scenarioStatus === 'failed') {
        console.error(`Scenario "${scenarioName}" failed!`);
    }
});

AfterAll(async function () {
    console.log('All scenarios completed. Performing cleanup...');
    // Close the app or terminate the session
    await browser.execute('mobile: terminateApp', { appId: 'com.swaglabsmobileapp' });

});

