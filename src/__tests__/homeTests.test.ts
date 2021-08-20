import { GamestopHome } from "./pageObjects/GamestopHome";
import { WebDriver, Capabilities, Builder, By } from "selenium-webdriver";


const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

const gs = new GamestopHome(driver);

const categories: Array<string> = ["Video Games","Controllers","PC Gaming","Electronics",
                                   "Keyboards","Headsets","Toys","Games","Clothing",
                                   "Collectibles","TV & Home","Lifestyle"];

const cats: Array<By> = [By.xpath("//p[contains(text(),'Video Games')]"),By.xpath("//p[contains(text(),'Controllers')]"),
                         By.xpath("//p[contains(text(),'PC Gaming')]"),By.xpath("//p[contains(text(),'Electronics')]"),
                         By.xpath("//p[contains(text(),'Keyboards')]"),By.xpath("//p[contains(text(),'Headsets')]"),
                         By.xpath("//p[contains(text(),'Toys')]"),By.xpath("//p[contains(text(),'Games')]"),
                         By.xpath("//p[contains(text(),'Clothing')]"),By.xpath("//p[contains(text(),'Collectibles')]"),
                         By.xpath("//p[contains(text(),'TV & Home')]"),By.xpath("//p[contains(text(),'Lifestyle')]")];


describe("Testing the user interface and links...", () => {
    
    beforeAll(async () => {
        await gs.maxWindow();
        await gs.openHome();
    });
    afterAll(async () => {
        await gs.close();
    });
    test.skip("To confirm that the homepage url is correct", async () => {
        expect(await gs.driver.getCurrentUrl()).toBe(gs.homeUrl);
        await gs.sleep(3000);
    });
    /*test("To confirm that the item categories are present", async () => {
        await categories.forEach((loc) => {
            it(`${loc} link should be displayed`, async () => {
                expect(gs.isDisplayed(By.xpath(`//p[contains(text(), '${loc}')]`))).toBeTruthy();
            });
        });
    });*/
    test("To confirm selected item categories exist", async () => {
        expect(await gs.isDisplayed(gs.videoGames)).toBe(true);
        expect(await gs.isDisplayed(gs.toys)).toBe(true);
        expect(await gs.isDisplayed(gs.clothing)).toBe(true);
    });
})