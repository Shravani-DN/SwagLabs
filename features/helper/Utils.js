export const CONTEXT_REF = {
    NATIVE: 'native',
    WEBVIEW: 'webview',
};

export default class Utils {
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

    async turnOnWifi() {
        driver.turnOnWifi();
    }

    async turnOffWifi() {
        driver.turnOffWifi();
    }
}