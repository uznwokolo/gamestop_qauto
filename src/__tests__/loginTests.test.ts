import { WebDriver, Capabilities, Builder, By, WebElement, Condition } from "selenium-webdriver";
import { GamestopHome } from "./pageObjects/GamestopHome";
import { Login } from "./pageObjects/Login";



const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

const home = new GamestopHome(driver);
const user = new Login(driver);


describe("Testing the login features...", () => {
    
    beforeAll(async () => {
        await home.maxWindow();
        await home.openHome();
    });
    afterAll(async () => {
        await user.close();
    });
    test("User can open the login page", async () => {
        await home.click(home.signInLink);
        await user.waitUntilFound(user.emailLogin);
        expect(await user.getUrl()).toBe(user.loginUrl);
    });
    test("User can sign into their account", async () => {
        await user.login();
        await user.waitUntilFound(user.userAccount);
        expect(await user.isDisplayed(user.userAccount)).toBe(true);
    });
    test("User can confirm their first name", async () => {
        await home.click(user.userAccount);
        let fname = await home.getElementText(user.userFirstName);
        await user.click(user.closeAcctModal); // close modal
        expect(await user.firstname).toBe(fname);
    });
    test("User can sign out of their account", async () => {
        await home.waitClick(user.userAccount, 500);
        //await user.waitUntilFound(user.signOutLink);
        await user.click(user.signOutLink);
        expect(await user.getUrl()).toBe(home.homeUrl);
    });
})