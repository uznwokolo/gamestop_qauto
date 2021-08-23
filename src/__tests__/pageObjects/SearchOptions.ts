import { By, WebDriver, WebElement } from "selenium-webdriver"




export class SearchOptions {
    // Search locators
    ps4: By = By.xpath("//a[@class='category-link']/span[contains(text(),'PlayStation 4')]");
    preOrder: By = By.xpath("(//label[contains(text(),'Pre-order')])[1]");
    boardGames: By = By.xpath("//a[@class='category-link']/span[contains(text(),'Board Games')]");
    inStock: By = By.xpath("(//label[contains(text(),'In Stock')])[1]");
    // Category link locators
    ps4Filter: By = By.xpath("//li[@class='breadcrumb-item']/a[contains(text(),'PlayStation 4')]");
    bgameFilter: By = By.xpath("//li[@class='breadcrumb-item']/a[contains(text(),'Board Games')]");
    // Filter locators - span
    preOrdFilter: By = By.xpath("//span[contains(text(),'Pre-order')]");
    inStockFilter: By = By.xpath("//span[contains(text(),'In Stock')]");
    // Dropdown
    sortButton: By = By.id("sortby-dropdown");
    bestMatches: By = By.xpath("//a[@data-id='best-matches']");
    topSellers: By = By.xpath("//a[@data-id='top-sellers']");
    lowToHigh: By = By.xpath("//a[@data-id='price-low-to-high']");
    highToLow: By = By.xpath("//a[@data-id='price-high-to-low']");
    newToOld: By = By.xpath("//a[@data-id='release-date-descending']");
    selectedOption: By = By.xpath("//span[@class='selected-option']");
}