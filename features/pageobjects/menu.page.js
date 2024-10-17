import { $ } from '@wdio/globals'
import Page from './page.js';


class MenuPage extends Page {
    
    get logOut() {
        return $('(//android.widget.TextView[@content-desc="test-Price"])[1]');
    }

    async logOutClick() {
        await this.logOut.click();   
    }  
}

export default new MenuPage();