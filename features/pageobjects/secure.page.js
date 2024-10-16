import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    //getting alert message
    get flashAlert () {
        return $("//android.view.ViewGroup[@content-desc='test-Error message']/android.widget.TextView");
    }
    //getting products text
    get dashboardTitle() {
        return $('android=new UiSelector().text("PRODUCTS")');
    }
}

export default new SecurePage();
