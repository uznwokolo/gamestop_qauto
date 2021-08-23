import { By, WebDriver, WebElement } from "selenium-webdriver"



export class GiftCards {

    homeUrl: string = "https://www.gamestop.com/gift-cards";

    // Gift card locators
    gsGiftCard: By = By.xpath("//a[@title='GameStop Gift Card']");
    giftCardTitle: By = By.xpath("//h1[@class='product-name']");
    physGiftCard: By = By.xpath("//span[contains(text(), 'Physical')]");
    otherAmount: By = By.xpath("//label[@for='giftCardAmount-4']");
    amountValue: By = By.id("textAmount");
    addToCartBtn: By = By.xpath("//button[@type='submit']");
    addToCartDisabled: By = By.xpath("//button[@disabled]");

}