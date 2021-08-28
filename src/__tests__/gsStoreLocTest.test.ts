import { GamestopHome } from "./pageObjects/GamestopHome";
import { WebDriver, Capabilities, Builder, By, WebElement } from "selenium-webdriver";
import * as branch from "../data/locations.json";
import { StoreLocator } from "./pageObjects/StoreLocator";


const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

const xs = new GamestopHome(driver);
const store = new StoreLocator(driver);



describe("Testing the store locator features...", () => {
    
    beforeAll(async () => {
        await xs.maxWindow();
        await xs.openHome();
    });
    afterAll(async () => {
        await xs.close();
    });
    // PT3US-10 - User can pick a location as their home store
    test("User can select a location using zip code", async () => {
        let storeLink: By =  await store.getStoreLink(branch[0].name);
        let storeMap: By = await store.getStoreMap(branch[0].name);

        await store.searchStoreByZip(String(branch[0].zip));
        /* await xs.waitClick(store.changeStore, 2000);
        await xs.sendKeys(store.storeSearch, `${branch[0].zip}`);
        await xs.waitClick(store.searchBtn, 2000);
        await xs.waitClick(storeMap, 2000);
        await xs.waitClick(store.setAsHomeBtn, 2000);*/
        await store.selectHomeStore(branch[0].name);
        expect(await xs.isDisplayed(storeLink)).toBe(true);
    });
    // PT3US-11 - User can search for a Gamestop location with a zip code (unhappy path)
    test("No locations near a zip code gives no results", async () => {
        await store.searchStoreByZip(String(branch[3].zip));
        /*await xs.waitClick(store.changeStore, 2000);
        await xs.sendKeys(store.storeSearch, `${branch[3].zip}`);
        await xs.waitClick(store.searchBtn, 2000);*/
        //let page = await xs.driver.getPageSource();
        expect(await xs.isDisplayed(store.noResultsPage)).toBe(true);
    });
})