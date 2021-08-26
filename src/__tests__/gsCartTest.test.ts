import { WebDriver, Capabilities, Builder, By, WebElement, Condition } from "selenium-webdriver";
import { GamestopHome } from "./pageObjects/GamestopHome";
import { GsItem, BuyOptions } from "./pageObjects/BuyOptions";
import * as item from "../data/gsItems.json";



const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

const gs = new GamestopHome(driver);
const buy = new BuyOptions(driver);



describe("Testing the cart features...", () => {
    
    beforeAll(async () => {
        await gs.maxWindow();
        await gs.openHome();
    });
    afterAll(async () => {
        await gs.close();
    });
    // PT3US-23 - User can add items into a cart
    test("User adds one item to cart", async () => {
        // Add items to cart
        await buy.addItemToCart(item[2]);
        // Check number of items in cart
        let qty = await buy.getElementText(buy.cartQuantity);
        expect(+qty).toBe(1);
        // Remove items from cart
        await buy.removeItemFromCart(item[2]);

        await buy.driver.sleep(4000)
        let page = await gs.driver.getPageSource();
        await buy.driver.sleep(4000)
        expect(page).toContain("Shopping Cart is Empty");
    });
    // PT3US-23 - User can add items into a cart
    test("User adds two items to cart", async () => {
        // Add items to cart
        await buy.addItemToCart(item[1]);
        await buy.addItemToCart(item[0]);
        // Check number of items in cart
        let qty = await buy.getElementText(buy.cartQuantity);
        expect(+qty).toBe(2);
        // Remove items from cart
        await buy.removeItemFromCart(item[1]);
        await buy.removeItemFromCart(item[0]);
        
        await buy.driver.sleep(3000) // obligatory wait time
        let page = await gs.driver.getPageSource();
        await buy.driver.sleep(3000) // obligatory wait time
        // Check if cart is empty
        expect(page).toContain("Shopping Cart is Empty");
    });
    // PT3US-24 - Items will remain in the cart until they are removed
    test("User adds another item, confirms it is in the cart before removal", async () => {
        await buy.addItemToCart(item[4]);
        // Open shopping cart
        await gs.waitClick(gs.cartLink, 2000);
        console.log("getting page contents");
        let page = await gs.driver.getPageSource();
        // Confirm item is in the cart
        expect(page).toContain(`${item[4].itemName}`);
        await buy.removeItemFromCart(item[4]);
    });
})