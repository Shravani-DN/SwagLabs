import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DashboardPage extends Page {
    /**
     * define selectors using getter methods
     */
    //getting products text
    get dashboardTitle() {
        return $('//android.widget.TextView[@text="PRODUCTS"]');
    }

    get btnMenu() {
        return $('//android.view.ViewGroup[@content-desc="test-Menu"]');
    }

    async menuClick() {
        await this.btnMenu.click();
    }  

}

export default new DashboardPage();
