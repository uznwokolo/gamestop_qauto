import { By, WebDriver, WebElement } from "selenium-webdriver"
import { BasePage } from "./BasePage";



export class Login extends BasePage {

    loginUrl: string = "https://www.gamestop.com/login/";
    accountUrl: string = "https://www.gamestop.com/create-account/";

    // User credentials
    private _userEmail: string = "tomega@mailinator.com";
    private _userPswd: string = "Ws7U@pp%M1Q0";
    private _firstName: string = "Tester";

    public get email() {
        return this._userEmail;
    }
    public get password() {
        return this._userPswd;
    }
    public get firstname() {
        return this._firstName;
    }


    // Login locators
    emailLogin: By = By.name("loginEmail");
    passwordLogin: By = By.name("loginPassword");
    loginBtn: By = By.xpath("//button[@type='submit']");
    createAccount: By = By.xpath("//div/a[contains(text(),'Create Account')]");
    keepSignedIn: By = By.css("div.custom-checkbox-new");

    // User account
    userAccount: By = By.id("user-message-account");
    userFirstName: By = By.css("span.user-first-name");
    signOutLink: By = By.css("a.logout-anchor");
    closeAcctModal: By = By.css("button.close");

    constructor(driver:WebDriver){
        super(driver);
    }


    async login() {
        await this.sendKeys(this.emailLogin, this.email);
        await this.sendKeys(this.passwordLogin, this.password);
        await this.click(this.keepSignedIn);
        await this.click(this.loginBtn);
    }
}