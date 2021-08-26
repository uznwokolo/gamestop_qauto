import { GamestopHome } from "./pageObjects/GamestopHome";
import { WebDriver, Capabilities, Builder, By, WebElement } from "selenium-webdriver";
import * as tark from "../data/terms.json";
import { SearchOptions } from "./pageObjects/SearchOptions";
import { GiftCards } from "./pageObjects/GiftCards";
import { TradeIn } from "./pageObjects/TradeIn";


const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

const gs = new GamestopHome(driver);
const find = new SearchOptions();
const gcard = new GiftCards();
const trade = new TradeIn();




describe("Testing the user interface and links...", () => {
    
    beforeEach(async () => {
        await gs.maxWindow();
        await gs.openHome();
    });
    afterAll(async () => {
        await gs.close();
    });
    test("To confirm that the homepage url is correct", async () => {
        expect(await gs.driver.getCurrentUrl()).toBe(gs.homeUrl);
        await gs.sleep(3000);
    });
    test("To confirm selected item categories exist", async () => {
        expect(await gs.isDisplayed(gs.videoGames)).toBe(true);
        expect(await gs.isDisplayed(gs.toys)).toBe(true);
        expect(await gs.isDisplayed(gs.clothing)).toBe(true);
        expect(await gs.isDisplayed(gs.collectibles)).toBe(true);
    });
    // PT3US-19 - User can use search bar to look for items
    test("Can display search results", async () => {
        await gs.sendKeys(gs.topSearchBar, `${tark[0].term}\n`);
        let page = await gs.driver.getPageSource();
        expect(page).toContain(`${tark[0].foundItem}`);
    });
    // PT3US-18 - Search filters should appear onscreen after being clicked
    test("Filters appear inscreen after they are clicked", async () => {
        await gs.click(gs.videoGames);
        await gs.waitClick(find.ps4, 1500); // 
        await gs.waitClick(find.preOrder, 1500);
        expect(await gs.isDisplayed(find.ps4Filter)).toBe(true);
        expect(await gs.isDisplayed(find.preOrdFilter)).toBe(true);
    });
    // PT3US-7 - User should be able to sort item prices in low to high order
    test("Can set item prices from low to high", async () => {
        await gs.click(gs.toys);
        await gs.click(find.sortButton);
        await gs.click(find.lowToHigh);
        let select = await gs.getAttribute(find.selectedOption, "innerText");
        expect(select).toBe("Price Low To High");
    });
    // PT3US-7 - User should be able to sort item prices in high to low order
    test("Can set item prices from low to high", async () => {
        await gs.click(gs.collectibles);
        await gs.click(find.sortButton);
        await gs.click(find.highToLow);
        let select = await gs.getAttribute(find.selectedOption, "innerText");
        expect(select).toBe("Price High To Low");
    });
    test("Can access the gift cards page", async () => {
        await gs.click(gs.giftCards);
        let page = await gs.driver.getPageSource();
        expect(await gs.getUrl()).toBe(gcard.homeUrl)
        expect(page).toContain("Gift Cards");
    });
    // PT3US-17 - Gift card limit must be between $10 and $500
    test("Gift card amount must be between $10 and $500 - $9 (lower boundary)", async () => {
        await gs.click(gs.giftCards);
        await gs.click(gcard.gsGiftCard);
        await gs.click(gcard.physGiftCard);
        await gs.click(gcard.otherAmount);
        await gs.sendKeys(gcard.amountValue, "9");
        await gs.click(gcard.giftCardTitle);
        expect(await gs.isDisplayed(gcard.addToCartDisabled)).toBe(true);
    });
    // PT3US-17 - Gift card limit must be between $10 and $500
    test("Gift card amount must be between $10 and $500 - $501 (upper boundary)", async () => {
        await gs.click(gs.giftCards);
        await gs.click(gcard.gsGiftCard);
        await gs.click(gcard.physGiftCard);
        await gs.click(gcard.otherAmount);
        await gs.sendKeys(gcard.amountValue, "501");
        await gs.click(gcard.giftCardTitle);
        expect(await gs.isDisplayed(gcard.addToCartDisabled)).toBe(true);
    });
    // PT3US-17 - Gift card limit must be between $10 and $500
    test("Gift card amount must be between $10 and $500 - $250 ", async () => {
        await gs.click(gs.giftCards);
        await gs.click(gcard.gsGiftCard);
        await gs.click(gcard.physGiftCard);
        await gs.click(gcard.otherAmount);
        await gs.sendKeys(gcard.amountValue, "250");
        await gs.click(gcard.giftCardTitle);
        expect(await gs.isDisplayed(gcard.addToCartBtn)).toBe(true);
    });
    // PT3US-13 - User should be able to find out what an item's trade-in value is
    test("Can figure out the trade-in value of a game", async () => {
        await gs.click(gs.tradeIns);
        await gs.sendKeys(trade.tradeInSearchBar, "ghosts");
        await gs.click(trade.tradeInBtn);
        await gs.click(trade.codGhosts);
        let page = await gs.driver.getPageSource();
        expect(page).toContain("Store Credit");
        expect(page).toContain("Cash");
        expect(page).toContain("Offer expires at the end of business day today");
    });
    
})