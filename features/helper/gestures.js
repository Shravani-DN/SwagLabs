import { browser } from '@wdio/globals'

/**
 * The values in the below object are percentages of the screen
 */
const SWIPE_DIRECTION = {
    down: {
        start: { x: 50, y: 15 },
        end: { x: 50, y: 85 },
    },
    left: {
        start: { x: 95, y: 50 },
        end: { x: 5, y: 50 },
    },
    right: {
        start: { x: 5, y: 50 },
        end: { x: 95, y: 50 },
    },
    up: {
        start: { x: 50, y: 85 },
        end: { x: 50, y: 15 },
    },
};

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    // open (path) {
    //     return browser.url(`https://the-internet.herokuapp.com/${path}`)
    // }

    static async checkIfDisplayedWithSwipeUp(element, maxScrolls, amount = 0) {
        // If the element is not displayed and we haven't scrolled the max amount of scrolls
        // then scroll and execute the method again
        if (!await element.isDisplayed() && amount <= maxScrolls) {
            await this.swipeUp(0.85);
            await this.checkIfDisplayedWithSwipeUp(element, maxScrolls, amount + 1);
        } else if (amount > maxScrolls) {
            // If the element is still not visible after the max amount of scroll let it fail
            throw new Error(`The element '${element}' could not be found or is not visible.`);
        }

        // The element was found, proceed with the next action
    }

    /**
    * Swipe down based on a scroll percentage
    * @param percentage scroll percentage (0 to 1)
    */
    static async swipeDown(percentage = 1) {
        await this.swipeOnPercentage(
            this.calculateXY(SWIPE_DIRECTION.down.start, percentage),
            this.calculateXY(SWIPE_DIRECTION.down.end, percentage),
        );
    }

    /**
     * Swipe Up based on a percentage
     * @param percentage scroll percentage (0 to 1)
     */
    static async swipeUp(percentage = 1) {
        await this.swipeOnPercentage(
            this.calculateXY(SWIPE_DIRECTION.up.start, percentage),
            this.calculateXY(SWIPE_DIRECTION.up.end, percentage),
        );
    }

    /**
     * Swipe left based on a percentage
     * @param percentage scroll percentage (0 to 1)
     */
    static async swipeLeft(percentage = 1) {
        await this.swipeOnPercentage(
            this.calculateXY(SWIPE_DIRECTION.left.start, percentage),
            this.calculateXY(SWIPE_DIRECTION.left.end, percentage),
        );
    }

    /**
     * Swipe right based on a percentage
     * @param percentage scroll percentage (0 to 1)
     */
    static async swipeRight(percentage = 1) {
        await this.swipeOnPercentage(
            this.calculateXY(SWIPE_DIRECTION.right.start, percentage),
            this.calculateXY(SWIPE_DIRECTION.right.end, percentage),
        );
    }

    /**
     * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are
     * percentages of the screen.
     * @param from start coordinate
     * @param to end coordinate
     */
    static async swipeOnPercentage(from, to) {
        // Get the screen size and store it so it can be re-used.
        // This will save a lot of webdriver calls if this methods is used multiple times.
        SCREEN_SIZE = SCREEN_SIZE || await driver.getWindowRect();
        // Get the start position on the screen for the swipe
        const pressOptions = this.getDeviceScreenCoordinates(SCREEN_SIZE, from);
        // Get the move to position on the screen for the swipe
        const moveToScreenCoordinates = this.getDeviceScreenCoordinates(SCREEN_SIZE, to);

        await this.swipe(
            pressOptions,
            moveToScreenCoordinates,
        );
    }

    /**
     * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are in pixels.
     * @param from start coordinate
     * @param to end coordinate
     */
    static async swipe(from, to) {
        await driver.performActions([
            {
                // a. Create the event
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    // b. Move finger into start position
                    { type: 'pointerMove', duration: 0, x: from.x, y: from.y },
                    // c. Finger comes down into contact with screen
                    { type: 'pointerDown', button: 0 },
                    // d. Pause for a little bit
                    { type: 'pause', duration: 100 },
                    // e. Finger moves to end position
                    //    We move our finger from the center of the element to the
                    //    starting position of the element.
                    //    Play with the duration to make the swipe go slower / faster
                    { type: 'pointerMove', duration: 1000, x: to.x, y: to.y },
                    // f. Finger gets up, off the screen
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);
        // Add a pause, just to make sure the swipe is done
        await driver.pause(1000);
    }

    /**
     * Get the screen coordinates based on a device his screen size
     * @param screenSize device dimension
     * @param coordinates location of the given element
     */
    static getDeviceScreenCoordinates(screenSize, coordinates) {
        return {
            x: Math.round(screenSize.width * (coordinates.x / 100)),
            y: Math.round(screenSize.height * (coordinates.y / 100)),
        };
    }

    /**
     * Calculate the x y coordinates based on a percentage
     * @param coordinates coordinates for given action(scroll or swipe)
     * @param percentage percentage for any action (0 to 1)
     */
    static calculateXY({ x, y }, percentage) {
        return {
            x: x * percentage,
            y: y * percentage,
        };
    }

    /**
    * method will perform Drag and drop gesture
    * @param elementOne start element for drag action(from)
    * @param elementTwo end element for drag action(to)
    */
    async dragElementTo(elementOne, elementTwo) {
        await driver.performActions([
            {
                // 1. Create the event
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    // 2. Move finger into start position where the element is
                    //    Appium can automatically determine the location of the element instead
                    //    of doing it ourselves
                    { type: 'pointerMove', duration: 0, origin: elementOne.elementId },
                    // 3. Finger comes down into contact with screen
                    { type: 'pointerDown', button: 0 },
                    // 4. Pause for a little bit
                    { type: 'pause', duration: 100 },
                    // 5. Finger moves to the second element.
                    //    Appium can automatically determine the location of the element instead
                    //    of doing it ourselves
                    { type: 'pointerMove', duration: 250, origin: elementTwo.elementId },
                    // 6. Finger lets up, off the screen
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);


        // Add a pause, just to make sure the drag and drop is done
        await driver.pause(1000);
    }

    /**
    * Long Press on an element
    * @param {WebElement} element The element to long press
    * @param {Number} duration Duration to hold in milliseconds
    */
    static async longPress(element, duration = 1000) {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, origin: element.elementId },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: duration },
                    { type: 'pointerUp', button: 0 }
                ],
            },
        ]);
    }

    /**
     * Pinch zoom in on an element (simulate a zoom-in gesture)
     * @param element target element on which pinch zoom will be performed
     */
    static async pinchZoomIn(element) {
        const rect = await element.getRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX - 100, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: 1000, x: centerX - 200, y: centerY },
                    { type: 'pointerUp', button: 0 }
                ],
            },
            {
                type: 'pointer',
                id: 'finger2',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX + 100, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: 1000, x: centerX + 200, y: centerY },
                    { type: 'pointerUp', button: 0 }
                ],
            },
        ]);
    }

    /**
     * Pinch zoom out on an element (simulate a zoom-out gesture)
     * @param element target element on which zoom out will be performed
     */
    static async pinchZoomOut(element) {
        const rect = await element.getRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX - 200, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: 1000, x: centerX - 100, y: centerY },
                    { type: 'pointerUp', button: 0 }
                ],
            },
            {
                type: 'pointer',
                id: 'finger2',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX + 200, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: 1000, x: centerX + 100, y: centerY },
                    { type: 'pointerUp', button: 0 }
                ],
            },
        ]);
    }
    /**
     * Scroll the page to a specific element.
     * @param element target element on which scroll will be performed
     */
    static async scrollToElement(element) {
        if (!element) {
            throw new Error('Element not found.');
        }
        await element.scrollIntoView();

    }

    /**
     * Scroll to the top of the page.
     */
    static async scrollToTop() {
        await browser.execute(() => window.scrollTo(0, 0));
    }

    /**
     * Scroll to the bottom of the page.
     */
    static async scrollToBottom() {
        await browser.execute(() => window.scrollTo(0, document.body.scrollHeight));
    }

    /**
     * Scroll down by a certain amount of pixels.
     * @param {number} pixels - Number of pixels to scroll down by.
     */
    static async scrollDown(pixels) {
        await browser.execute((scrollAmount) => window.scrollBy(0, scrollAmount), pixels);
    }

    /**
     * Scroll up by a certain amount of pixels.
     * @param {number} pixels - Number of pixels to scroll up by.
     */
    static async scrollUp(pixels) {
        await browser.execute((scrollAmount) => window.scrollBy(0, -scrollAmount), pixels);
    }

    /**
     * Scroll right by a certain amount of pixels.
     * @param {number} pixels - Number of pixels to scroll right by.
     */
    static async scrollRight(pixels) {
        await browser.execute((scrollAmount) => window.scrollBy(scrollAmount, 0), pixels);
    }

    /**
     * Scroll left by a certain amount of pixels.
     * @param {number} pixels - Number of pixels to scroll left by.
     */
    static async scrollLeft(pixels) {
        await browser.execute((scrollAmount) => window.scrollBy(-scrollAmount, 0), pixels);
    }
}
