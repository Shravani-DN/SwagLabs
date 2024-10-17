export const CONTEXT_REF = {
    NATIVE: 'native',
    WEBVIEW: 'webview',
};

export default class Utils {


    /**
     * method to wait for all the app contexts to be loaded
     */
    async waitForWebViewContextLoaded() {
        await driver.waitUntil(
            async () => {
                const currentContexts = await this.getCurrentContexts();

                return currentContexts.length > 1 &&
                    currentContexts.find(context => context.toLowerCase().includes(CONTEXT_REF.WEBVIEW)) !== 'undefined';
            }, {
            // Wait a max of 45 seconds. Reason for this high amount is that loading
            // a webview for iOS might take longer
            timeout: 45000,
            timeoutMsg: 'Webview context not loaded',
            interval: 100,
        },
        );
    }

    /**
     * Switch the app context to the given context
     * @param context = Context user intends to change
     */
    async switchToContext(context) {
        // The first context will always be the NATIVE_APP,
        // the second one will always be the WebdriverIO web page
        await driver.switchContext((await this.getCurrentContexts())[context === CONTEXT_REF.NATIVE ? 0 : 1]);
    }

    /**
     * Returns an object with the list of all available contexts
     */
    async getCurrentContexts() {
        return driver.getContexts();
    }

    /**
     * method to turn on the device wifi
     */
    async turnOnWifi() {
        driver.turnOnWifi();
    }

    /**
     * method to turn off the device wifi
     */
    async turnOffWifi() {
        driver.turnOffWifi();
    }
}