import { BasePage } from "./BasePage";
import { GamestopHome } from "./GamestopHome";
import { By } from "selenium-webdriver";




export class StoreLocator extends BasePage{

    changeStore: By = By.xpath("(//span[contains(text(), 'store')])");
    storeSearch: By = By.name("postalCode");
    searchBtn: By = By.xpath("//button[contains(@class, 'btn-storelocator-search')]");
    setAsHomeBtn: By = By.xpath("//a[contains(@class,'my-store-link')]");

    noResultsPage: By = By.xpath("//p[contains(@class, 'store-locator-no-results')]");

    async getStoreLink(val: string) {
        let sLink: By = By.xpath(`//span[contains(@class, 'store-name') and contains(text(), '${val}')]`);
        return sLink;
    }

    async getStoreMap(val: string) {
        let sMap: By = By.xpath(`//a[@class='store-map']/h2[contains(text(),'${val}')]`);
        return sMap;
    }

    async getStoreMapAndLink(val: string) {
        let sMap: By = By.xpath(`//a[@class='store-map']/h2[contains(text(),'${val}')]`);
        let sLink: By = By.xpath(`//span[contains(@class, 'store-name') and contains(text(), '${val}')]`);
        return [sMap, sLink];
    }

    async searchStoreByZip(zip: string) {
        await this.waitClick(this.changeStore, 2000);
        await this.sendKeys(this.storeSearch, `${zip}`);
        await this.waitClick(this.searchBtn, 2000);
    }

    async selectHomeStore(name: string) {
        let [storeNameLocator, homeStoreLink] = await this.getStoreMapAndLink(name);
        await this.waitClick(storeNameLocator, 2000);
        await this.waitClick(homeStoreLink, 2000);
    }


}