import { By, WebDriver, WebElement } from "selenium-webdriver"
import { BasePage } from "./BasePage"


export class GamestopHome extends BasePage {

    //driver!: WebDriver;
    home: string = "https://www.gamestop.com/";

    // Getter
    get homeUrl(): string {
        return this.home;
    }

    // Home page locators
    gameStopLogo: By = By.xpath("//a[@title='GameStop Home']");
    hamburgerMenu: By = By.css(".navbar-toggler");
    topSearchBar: By = By.name("q");
    signInLink: By = By.id("account-modal-link-nocache");
    cartLink: By = By.css(".minicart-link");
    changeStore: By = By.xpath("(//span[contains(text(), 'store')])");
    tradeIns: By = By.xpath("//span[contains(text(), 'Trade-Ins')]");
    giftCards: By = By.xpath("//a[@data-name='Gift Cards']");
    // Selected categories
    videoGames: By = By.xpath("//p[contains(text(), 'Video Games')]");
    toys: By = By.xpath("//p[contains(text(), 'Toys')]");
    clothing: By = By.xpath("//p[contains(text(), 'Clothing')]");
    collectibles: By = By.xpath("//p[contains(text(),'Collectibles')]");
    // Gift card item
    


    constructor(driver:WebDriver){
        super(driver);
    }

    /**
     * This method opens the GameStop homepage
     */
    async openHome(){
        await super.open(this.home);
    }

    async getUrl() {
        return this.driver.getCurrentUrl();
    }

    async isDisplayed(locator: By): Promise<boolean> {
        return this.driver.findElement(locator).isDisplayed();
    }

    async isEnabled(locator: By): Promise<boolean> {
        return this.driver.findElement(locator).isEnabled();
    }

    async searchItem(value: string) {
        await this.sendKeys(this.topSearchBar, value);
    }

    async waitClick(locator: By, time: number) {
        await this.click(locator);
        await this.sleep(time);
    }
}