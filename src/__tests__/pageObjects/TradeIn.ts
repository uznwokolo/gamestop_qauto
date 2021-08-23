import { By, WebDriver, WebElement } from "selenium-webdriver"



export class TradeIn {

    homeUrl: string = "https://www.gamestop.com/trade/?cgid=video-games";

    // Trade-in locators
    tradeInSearchBar: By = By.xpath("//input[@placeholder='Find values for games and more']");
    tradeInBtn: By = By.xpath("//button[contains(text(), 'Search')]");

    // Sample game items
    codGhosts: By = By.xpath("//a[contains(text(),'Call of Duty: Ghosts')]");

}