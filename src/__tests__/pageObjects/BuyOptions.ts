import { BasePage } from "./BasePage";
import { GamestopHome } from "./GamestopHome";
import { By } from "selenium-webdriver";




export interface GsItem {
    searchTerm: string,
    itemName: string,
    console?: string
}


export class BuyOptions extends GamestopHome {
    //
    addToCartBtn: By = By.id("add-to-cart");
    keepShopping: By = By.xpath("//a[contains(text(),'Keep Shopping')]");
    cartQuantity: By = By.xpath("(//span[contains(@class, 'minicart-quantity')])[1]");
    removeItem: By = By.xpath("//a[contains(text(),'Remove')]");
    confirmRemove: By = By.id("minicart-delete-confirmation-btn");

    /**
     * This method forms the item link that will be clicked
     * @param item - the item object
     * @returns 
     */
    async getItemLink(item: GsItem): Promise<string> {
        if(item.console) {
            return `${item.itemName} - ${item.console}`
        } else {
            return `${item.itemName}`;
        }
    }

    /**
     * This method forms the locator needed to remove an item when clicked
     * @param item - the item object
     * @returns - a By object
     */
    async getRemoveLocator(item: GsItem) {
        let remLoc = By.xpath(`//a[@class='remove-btn remove-product remove-line-hyperlink' and @data-name='${item.itemName}']`);
        return remLoc;
    }

    /**
     * This method adds an item to the cart
     * @param item - the item object
     */
    async addItemToCart(item: GsItem) {
        await this.sendKeys(this.topSearchBar, `${item.searchTerm}\n`);
        let link = await this.getItemLink(item);
        //console.log(link);
        //await (await this.waitUntilFound(By.xpath(`//a[@class='link-name']//p[contains(text(), '${link}')]`))).click();
        await (await this.waitUntilFound(By.xpath(`//a[@title='${link}']`))).click();
        await this.click(this.addToCartBtn);
        await this.click(this.keepShopping);
    }
    
    /**
     * This method removes an item from the cart
     * @param item - the item object
     * @returns 
     */
    async removeItemFromCart(item: GsItem) {
        await this.waitClick(this.cartLink, 1500);
        let remove = await this.getRemoveLocator(item);
        (await this.waitUntilFound(remove)).click();
        return (await this.waitUntilFound(this.confirmRemove)).click();
    }

    
}